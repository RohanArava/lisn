import { Stack, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

export default function PlayerControls({ isPlaying, togglePlayback }) {
  return (
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={4} sx={{ mb: 3 }}>
      <IconButton disabled>
        <SkipPreviousIcon sx={{ color: "#fff" }} />
        {/* Placeholder skip icons. As there is only one demo track, these don't do anything  */}
      </IconButton>
      <IconButton
        onClick={togglePlayback}
        sx={{
          backgroundColor: "#f06292",
          color: "#fff",
          "&:hover": { backgroundColor: "#ec407a" },
          width: 60,
          height: 60,
        }}
      >
        {isPlaying ? <PauseIcon fontSize="large" /> : <PlayArrowIcon fontSize="large" />}
      </IconButton>
      <IconButton disabled>
        <SkipNextIcon sx={{ color: "#fff" }} />
      </IconButton>
    </Stack>
  );
}