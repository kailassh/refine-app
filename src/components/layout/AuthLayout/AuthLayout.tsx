/**
 * AuthLayout component - Layout wrapper for authentication pages using Material-UI.
 * 
 * This component provides consistent layout and styling using MUI components
 * for all authentication-related pages with modern design patterns.
 * 
 * @fileoverview Layout component for authentication pages with MUI
 */

import React from 'react';
import { Box, Container, Stack, Typography, Link } from '@mui/material';
import { Logo } from '../../shared/Logo';

/**
 * Props interface for the AuthLayout component.
 */
interface AuthLayoutProps {
  /** Children components to render in the main content area */
  children: React.ReactNode;
  /** Custom styling */
  sx?: object;
}

/**
 * AuthLayout functional component using Material-UI components.
 * 
 * Provides the standard layout structure for authentication pages with
 * consistent modern styling and responsive design using MUI's sx prop approach.
 * 
 * @param props - Component props including children and styling
 * @returns JSX element representing the authentication page layout
 */
export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  sx = {}
}) => {
  return (
    <Box 
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
        ...sx
      }}
    >
      {/* Header Section - Contains the application logo */}
      <Box 
        component="header" 
        sx={{ 
          px: { xs: 3, sm: 4 }, 
          py: { xs: 3, sm: 4 } 
        }}
      >
        <Logo />
      </Box>

      {/* Main Content Section - Contains the authentication forms */}
      <Box 
        component="main" 
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
          py: { xs: 6, sm: 12 }
        }}
      >
        <Container maxWidth="xs">
          <Stack spacing={4} sx={{ width: '100%' }}>
            {children}
          </Stack>
        </Container>
      </Box>

      {/* Footer Section - Legal links and branding */}
      <Box 
        component="footer" 
        sx={{ 
          px: { xs: 3, sm: 4 }, 
          py: { xs: 4, sm: 5 } 
        }}
      >
        <Container maxWidth="xs">
          <Stack spacing={2} sx={{ textAlign: 'center' }}>
            {/* Terms and Privacy Links */}
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              By continuing, you agree to our{' '}
              <Link 
                href="/terms" 
                sx={{ 
                  color: 'text.secondary',
                  textDecoration: 'underline',
                  '&:hover': { color: 'text.primary' },
                  '&:focus-visible': {
                    outline: '2px solid',
                    outlineColor: 'primary.main',
                    outlineOffset: '2px',
                    borderRadius: '2px'
                  }
                }}
              >
                Terms of Use
              </Link>{' '}
              and{' '}
              <Link 
                href="/privacy" 
                sx={{ 
                  color: 'text.secondary',
                  textDecoration: 'underline',
                  '&:hover': { color: 'text.primary' },
                  '&:focus-visible': {
                    outline: '2px solid',
                    outlineColor: 'primary.main',
                    outlineOffset: '2px',
                    borderRadius: '2px'
                  }
                }}
              >
                Privacy policy
              </Link>
            </Typography>
            
            {/* Branding Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                curated by
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
                refine<Box component="span" sx={{ color: 'text.secondary' }}>.</Box>
              </Typography>
            </Box>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default AuthLayout;