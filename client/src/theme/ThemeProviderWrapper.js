import React, { createContext, useMemo, useState, useContext } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import lightTheme from './lightTheme';
import darkTheme from './darkTheme';

export const ThemeToggleContext = createContext();

// export const useThemeToggle = () => useContext(ThemeToggleContext);

const ThemeProviderWrapper = ({ children }) => {
  // Set initial mode based on system preference
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light');

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

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
