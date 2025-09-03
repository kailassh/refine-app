import type { Components, Theme } from '@mui/material/styles';
import { BORDER_RADIUS, MUI_SPACING, FONT_WEIGHTS, FOCUS_CONFIG } from '../constants';

export const components: Components<Omit<Theme, 'components'>> = {
  // Button component overrides
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: `${BORDER_RADIUS.MD}px`,
        textTransform: 'none',
        fontWeight: FONT_WEIGHTS.MEDIUM,
        padding: `${MUI_SPACING.HALF}px ${MUI_SPACING.ONE}px`,
        minHeight: `${MUI_SPACING.TWO + MUI_SPACING.HALF}px`,
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
        '&:focus-visible': {
          outline: `${FOCUS_CONFIG.OUTLINE_WIDTH}px ${FOCUS_CONFIG.OUTLINE_STYLE}`,
          outlineColor: 'primary.main',
          outlineOffset: `${FOCUS_CONFIG.OUTLINE_OFFSET}px`,
        },
      },
      sizeSmall: {
        padding: '0.25rem 0.75rem',
        minHeight: '2rem',
        fontSize: '0.875rem',
      },
      sizeLarge: {
        padding: '0.625rem 1.5rem',
        minHeight: '2.5rem',
        fontSize: '1rem',
      },
      contained: {
        '&:hover': {
          backgroundColor: 'hsl(173, 70%, 35%)', // updated to match new primary dark shade
        },
      },
      outlined: {
        borderColor: 'hsl(240, 5.9%, 90%)',
        '&:hover': {
          borderColor: 'hsl(173, 60%, 45%)', // updated to match new primary
          backgroundColor: 'hsl(173, 40%, 96%)', // lighter teal background
        },
      },
      text: {
        '&:hover': {
          backgroundColor: 'hsl(173, 40%, 96%)', // lighter teal background
        },
      },
    },
  },

  // TextField component overrides
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: '0.5rem',
          '& fieldset': {
            borderColor: 'hsl(240, 5.9%, 90%)',
          },
          '&:hover fieldset': {
            borderColor: 'hsl(240, 5.9%, 70%)',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'hsl(173, 60%, 45%)', // updated to match new primary
            borderWidth: '2px',
          },
          '&.Mui-error fieldset': {
            borderColor: 'hsl(0, 72%, 51%)',
          },
        },
      },
    },
  },

  // Card component overrides
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: `${BORDER_RADIUS.LG}px`,
        border: '1px solid hsl(240, 5.9%, 90%)',
        boxShadow: 'none',
      },
    },
  },

  // Paper component overrides
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: `${BORDER_RADIUS.MD}px`,
      },
      elevation1: {
        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      },
    },
  },

  // AppBar component overrides
  MuiAppBar: {
    styleOverrides: {
      root: {
        boxShadow: 'none',
        borderBottom: '1px solid hsl(240, 5.9%, 90%)',
      },
    },
  },

  // Form label overrides
  MuiFormLabel: {
    styleOverrides: {
      root: {
        fontSize: '0.875rem',
        fontWeight: FONT_WEIGHTS.MEDIUM,
        marginBottom: '0.5rem',
        '&.Mui-focused': {
          color: 'hsl(173, 60%, 45%)', // updated to match new primary
        },
      },
    },
  },

  // Input base overrides
  MuiInputBase: {
    styleOverrides: {
      root: {
        fontSize: '1rem',
        '&.Mui-disabled': {
          opacity: 0.6,
        },
      },
    },
  },

};