import { createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f5f5f5",
      paper: "#fff",
    },
  },
  // Custom reusable styles
  glassCard: {
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(15px)",
    WebkitBackdropFilter: "blur(15px)", // Safari support
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.05)",
  },
});

export default lightTheme;
