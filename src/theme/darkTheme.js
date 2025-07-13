import { createTheme } from "@mui/material";

export default createTheme({
  palette: {
    mode: "dark",
    background: { default: "#121212", paper: "#1b1d2a" },
    primary: { main: "#f48fb1" },
    secondary: { main: "#2c2e3e" },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});