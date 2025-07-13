import { Typography, Slider } from "@mui/material";

export default function SliderControl({ label, value, min, max, step, onChange }) {
  return (
    <div>
      <Typography gutterBottom sx={{ color: "#eee" }}>
        {label}
      </Typography>
      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(_, val) => onChange(val)}
        sx={{ color: "#f48fb1" }}
      />
    </div>
  );
}