import { alpha } from '@mui/material/styles';

// Color constants using mild to light teal shades
const colors = {
  primary: {
    main: 'hsl(173, 60%, 45%)',    // mild teal as main primary
    light: 'hsl(173, 40%, 60%)',   // light teal for lighter variants
    dark: 'hsl(173, 70%, 35%)',    // slightly darker teal
    contrastText: 'hsl(0, 0%, 98%)', // --primary-foreground
  },
  secondary: {
    main: 'hsl(240, 4.8%, 95.9%)', // --secondary
    light: 'hsl(240, 4.8%, 98%)',
    dark: 'hsl(240, 4.8%, 90%)',
    contrastText: 'hsl(240, 5.9%, 10%)', // --secondary-foreground
  },
  error: {
    main: 'hsl(0, 72%, 51%)', // --destructive
    light: 'hsl(0, 72%, 65%)',
    dark: 'hsl(0, 72%, 40%)',
    contrastText: 'hsl(0, 0%, 98%)', // --destructive-foreground
  },
  text: {
    primary: 'hsl(240, 10%, 3.9%)', // --foreground
    secondary: 'hsl(240, 3.8%, 45.1%)', // --muted-foreground
  },
  background: {
    default: 'hsl(0, 0%, 100%)', // --background
    paper: 'hsl(0, 0%, 100%)', // --card
  },
  divider: 'hsl(240, 5.9%, 90%)', // --border
} as const;

const darkColors = {
  primary: {
    main: 'hsl(173, 55%, 50%)',    // slightly brighter teal for dark mode
    light: 'hsl(173, 45%, 65%)',   // light teal for dark mode
    dark: 'hsl(173, 65%, 40%)',    // darker teal for dark mode
    contrastText: 'hsl(240, 5.9%, 10%)',
  },
  secondary: {
    main: 'hsl(240, 3.7%, 15.9%)', // --secondary dark
    light: 'hsl(240, 3.7%, 25%)',
    dark: 'hsl(240, 3.7%, 10%)',
    contrastText: 'hsl(0, 0%, 98%)', // --secondary-foreground dark
  },
  error: {
    main: 'hsl(0, 62.8%, 30.6%)', // --destructive dark
    light: 'hsl(0, 62.8%, 45%)',
    dark: 'hsl(0, 62.8%, 20%)',
    contrastText: 'hsl(0, 0%, 98%)',
  },
  text: {
    primary: 'hsl(0, 0%, 98%)', // --foreground dark
    secondary: 'hsl(240, 5%, 64.9%)', // --muted-foreground dark
  },
  background: {
    default: 'hsl(240, 10%, 3.9%)', // --background dark
    paper: 'hsl(240, 10%, 3.9%)', // --card dark
  },
  divider: 'hsl(240, 3.7%, 15.9%)', // --border dark
} as const;

export const lightPalette = {
  mode: 'light' as const,
  ...colors,
  action: {
    hover: alpha(colors.primary.main, 0.04),
    selected: alpha(colors.primary.main, 0.08),
    disabled: alpha(colors.text.primary, 0.26),
    disabledBackground: alpha(colors.text.primary, 0.12),
  },
};

export const darkPalette = {
  mode: 'dark' as const,
  ...darkColors,
  action: {
    hover: alpha(darkColors.primary.main, 0.08),
    selected: alpha(darkColors.primary.main, 0.16),
    disabled: alpha(darkColors.text.primary, 0.3),
    disabledBackground: alpha(darkColors.text.primary, 0.12),
  },
};