import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#121212",
      paper: "#1d1d1d",
    },
  },
  glassCard: {
    background: "rgba(0, 0, 0, 0.35)",
    backdropFilter: "blur(15px)",
    WebkitBackdropFilter: "blur(15px)", // Safari support
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.6)",
    color: "rgba(255, 255, 255, 0.85)",
  },
});

export default darkTheme;