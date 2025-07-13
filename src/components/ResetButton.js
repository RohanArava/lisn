import { Box, Button } from "@mui/material";

export default function ResetButton({ onClick }) {
  return (
    <Box textAlign="right">
      <Button
        variant="outlined"
        color="primary"
        onClick={onClick}
        sx={{
          textTransform: "none",
          borderColor: "#f48fb1",
          color: "#f48fb1",
          "&:hover": {
            borderColor: "#f06292",
            backgroundColor: "rgba(244,143,177,0.08)",
          },
        }}
      >
        Reset to Default
      </Button>
    </Box>
  );
}
