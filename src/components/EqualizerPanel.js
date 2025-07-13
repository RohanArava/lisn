import { Box, Typography, Stack } from "@mui/material";
import SliderControl from "./SliderControl";

export default function EqualizerPanel({ eq, setEq }) {
  return (
    <Box sx={{ mt: 4, px: 2, py: 3, borderRadius: 2, backgroundColor: "#1e1f2a" }}>
      <Typography variant="subtitle1" sx={{ color: "#f48fb1", fontWeight: 600, mb: 2 }}>
        Equalizer
      </Typography>
      <Stack spacing={3}>
        <SliderControl
          label={`Low (${eq.low} dB)`}
          value={eq.low}
          min={-24}
          max={24}
          step={1}
          onChange={(v) => setEq((prev) => ({ ...prev, low: v }))}
        />
        <SliderControl
          label={`Mid (${eq.mid} dB)`}
          value={eq.mid}
          min={-24}
          max={24}
          step={1}
          onChange={(v) => setEq((prev) => ({ ...prev, mid: v }))}
        />
        <SliderControl
          label={`High (${eq.high} dB)`}
          value={eq.high}
          min={-24}
          max={24}
          step={1}
          onChange={(v) => setEq((prev) => ({ ...prev, high: v }))}
        />
      </Stack>
    </Box>
  );
}
