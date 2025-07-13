import { Box, Stack, Typography, Slider } from "@mui/material";

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function SeekBar({ currentTime, duration, onSeek }) {
  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography sx={{ color: "#bbb", minWidth: 40 }}>{formatTime(currentTime)}</Typography>
        <Slider
          min={0}
          max={duration}
          step={0.01}
          value={currentTime}
          onChange={onSeek}
          sx={{ color: "#f48fb1", flexGrow: 1 }}
        />
        <Typography sx={{ color: "#bbb", minWidth: 40 }}>{formatTime(duration)}</Typography>
      </Stack>
    </Box>
  );
}
