import { Card, Stack } from "@mui/material";
import SliderControl from "./SliderControl";

export default function TuningPanel({ speed, pitch, reverbWet, setSpeed, setPitch, setReverbWet }) {
  return (
    <Card sx={{ mt: 6, p: 4, backgroundColor: "#2c2e3e" }}>
      <Stack spacing={4}>
        <SliderControl label="Speed" value={speed} min={0.5} max={2} step={0.01} onChange={setSpeed} />
        <SliderControl label="Pitch" value={pitch} min={-12} max={12} step={1} onChange={setPitch} />
        <SliderControl
          label={`Reverb Wetness (${Math.round(reverbWet * 100)}%)`}
          value={reverbWet}
          min={0}
          max={1}
          step={0.01}
          onChange={setReverbWet}
        />
      </Stack>
    </Card>
  );
}
