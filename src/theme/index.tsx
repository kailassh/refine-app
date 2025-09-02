import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { lightPalette, darkPalette } from './palette';
import { typography } from './typography';
import { components } from './components';
import React, { createContext, useContext, useState, useEffect } from 'react';

// Theme creation functions
export const createLightTheme = () => createTheme({
  palette: lightPalette,
  typography,
  components,
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
});

export const createDarkTheme = () => createTheme({
  palette: darkPalette,
  typography,
  components,
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
});

// Theme context for managing dark/light mode
interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
});

export const useThemeMode = () => useContext(ThemeContext);

// Theme provider component
interface MuiThemeProviderProps {
  children: React.ReactNode;
}

export const MuiThemeProvider: React.FC<MuiThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  // Load theme preference from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('theme-mode');
    if (stored) {
      setIsDark(stored === 'dark');
    } else {
      // Check system preference
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('theme-mode', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme = isDark ? createDarkTheme() : createLightTheme();

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

// Export themes for direct use
export const lightTheme = createLightTheme();
export const darkTheme = createDarkTheme();