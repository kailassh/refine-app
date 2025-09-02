import type { Components, Theme } from '@mui/material/styles';

export const components: Components<Omit<Theme, 'components'>> = {
  // Button component overrides
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: '0.5rem', // --radius from original theme
        textTransform: 'none',
        fontWeight: 500,
        padding: '0.5rem 1rem',
        minHeight: '2.25rem',
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
        '&:focus-visible': {
          outline: '3px solid',
          outlineColor: 'hsl(173, 60%, 45%)', // updated to match new primary color
          outlineOffset: '2px',
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
        borderRadius: '0.75rem',
        border: '1px solid hsl(240, 5.9%, 90%)',
        boxShadow: 'none',
      },
    },
  },

  // Paper component overrides
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: '0.5rem',
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
        fontWeight: 500,
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