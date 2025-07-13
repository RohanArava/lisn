import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import darkTheme from "./theme/darkTheme";
import TrackDetails from "./components/TrackDetails";
import ResetButton from "./components/ResetButton";
import TuningPanel from "./components/TuningPanel";
import EqualizerPanel from "./components/EqualizerPanel";

export default function App() {
  const playerRef = useRef(null);
  const eqRef = useRef(null);
  const reverbRef = useRef(null);
  const pitchShiftRef = useRef(null);
  const gainRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [pitch, setPitch] = useState(0);
  const [reverbWet, setReverbWet] = useState(0.5);
  const [eq, setEq] = useState({ low: 0, mid: 0, high: 0 });
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const rafIdRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    const setup = async () => {
      // setting up tuners
      const reverb = new Tone.Reverb({ decay: 3, preDelay: 0.01 }).toDestination();
      reverb.wet.value = reverbWet;

      const eq3 = new Tone.EQ3(eq.low, eq.mid, eq.high);
      const pitchShift = new Tone.PitchShift(pitch);
      const gain = new Tone.Gain(0.8);

      // Load the audio file and set up the player
      const player = new Tone.Player({
        url: "/Else_hit.mp3", // the demo track is taken from https://sidechayn-client-l8xo3.ondigitalocean.app/song-play/03765aec-41e4-4ae8-a845-a633336b4f27
        loop: true,
        autostart: false,
        onload: () => setDuration(player.buffer.duration),
      });

      // connect the player to the effects chain
      player.chain(pitchShift, eq3, reverb, gain, Tone.Destination);

      playerRef.current = player;
      eqRef.current = eq3;
      reverbRef.current = reverb;
      pitchShiftRef.current = pitchShift;
      gainRef.current = gain;
    };
    setup();
  }, []);

  // Sync updated values to tone.js nodes
  useEffect(() => {
    if (playerRef.current) playerRef.current.playbackRate = speed;
    if (pitchShiftRef.current) pitchShiftRef.current.pitch = pitch;
    if (reverbRef.current) reverbRef.current.wet.value = reverbWet;
    if (eqRef.current) {
      eqRef.current.low.value = eq.low;
      eqRef.current.mid.value = eq.mid;
      eqRef.current.high.value = eq.high;
    }
  }, [speed, pitch, reverbWet, eq]);

  useEffect(() => () => cancelAnimationFrame(rafIdRef.current), []);

  // for updating the current time of the seek bar
  // tune.js doesn't provide a callback for time updates, so we use requestAnimationFrame
  const trackProgress = () => {
    const update = () => {
      if (!playerRef.current || !startTimeRef.current) return;
      const elapsed = (Tone.now() - startTimeRef.current) * speed;
      setCurrentTime(elapsed % duration);
      rafIdRef.current = requestAnimationFrame(update);
    };
    rafIdRef.current = requestAnimationFrame(update);
  };

  // toggle playback state. we have to handle both starting and stopping the player
  // and also update tracking the current time for the seek bar
  const togglePlayback = async () => {
    await Tone.start();
    if (isPlaying) {
      playerRef.current.stop();
      cancelAnimationFrame(rafIdRef.current); // stop tracking progress for seek bar
    } else {
      const offset = currentTime;
      startTimeRef.current = Tone.now() - offset / speed;
      playerRef.current.start(undefined, offset);
      trackProgress(); // start tracking progress for seek bar
    }
    setIsPlaying((prev) => !prev);
  };

  // update the current time when the seek bar is moved
  // this will stop the player, seek to the new position, and restart it
  const handleSeek = (_, val) => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.stop();
      playerRef.current.start(undefined, val);
      startTimeRef.current = Tone.now() - val / speed;
    }
    setCurrentTime(val);
  };

  const resetSettings = () => {
    setSpeed(1);
    setPitch(0);
    setReverbWet(0.5);
    setEq({ low: 0, mid: 0, high: 0 });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ mt: 6, mb: 4 }}>
        <TrackDetails isPlaying={isPlaying} togglePlayback={togglePlayback} currentTime={currentTime} duration={duration} onSeek={handleSeek} />
        <ResetButton onClick={resetSettings} />
        <TuningPanel speed={speed} pitch={pitch} reverbWet={reverbWet} setSpeed={setSpeed} setPitch={setPitch} setReverbWet={setReverbWet} />
        <EqualizerPanel eq={eq} setEq={setEq} />
      </Container>
    </ThemeProvider>
  );
}
