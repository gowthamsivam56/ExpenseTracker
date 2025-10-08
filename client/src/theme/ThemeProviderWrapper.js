import React, { createContext, useMemo, useState, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import lightTheme from "./lightTheme";
import darkTheme from "./darkTheme";
import backgroundImage from "../assets/images/background_image.png";

export const ThemeToggleContext = createContext();

const ThemeProviderWrapper = ({ children }) => {
  // Set initial mode based on system preference
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () => (mode === "light" ? lightTheme : darkTheme),
    [mode]
  );

  useEffect(() => {
    if (mode === "light") {
      document.body.style.background = `url(${backgroundImage})`;
      document.body.style.backgroundSize = "cover";
    } else {
      document.body.style.background = "#121212"; // dark solid background
    }
  }, [mode]);

  return (
    <ThemeToggleContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};

export default ThemeProviderWrapper;
