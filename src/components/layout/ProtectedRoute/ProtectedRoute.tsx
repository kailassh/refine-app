/**
 * ProtectedRoute component - Route guard for authenticated pages.
 * 
 * This component wraps protected content and redirects unauthenticated
 * users to the appropriate authentication step. It handles different
 * authentication states and ensures proper routing based on user status.
 * 
 * @fileoverview Protected route wrapper for authentication-required pages
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { Box, CircularProgress, Typography, Stack } from '@mui/material';
import { type AuthState } from '../../../types/auth';

/**
 * Props interface for the ProtectedRoute component.
 */
interface ProtectedRouteProps {
  /** Children components to render when authenticated */
  children: React.ReactNode;
  /** Current authentication state */
  authState: AuthState;
  /** Redirect path for unauthenticated users (default: '/login') */
  redirectTo?: string;
}

/**
 * ProtectedRoute functional component.
 * 
 * Acts as a route guard that checks authentication status before rendering
 * protected content. Redirects users to appropriate authentication steps
 * based on their current auth state. Shows loading state while authentication
 * status is being determined.
 * 
 * @param props - Component props including children and auth state
 * @returns JSX element - either protected content or redirect
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  authState,
  redirectTo = '/login'
}) => {
  // Show loading spinner while authentication is being processed
  if (authState.isLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4
        }}
      >
        <Stack spacing={2} alignItems="center">
          <CircularProgress 
            size={32} 
            sx={{ color: 'text.secondary' }}
          />
          <Typography 
            variant="body2" 
            sx={{ color: 'text.secondary' }}
          >
            Loading...
          </Typography>
        </Stack>
      </Box>
    );
  }

  // Check if user is authenticated
  if (!authState.isAuthenticated) {
    // Redirect to login or appropriate auth step
    return <Navigate to={redirectTo} replace />;
  }

  // User is authenticated, render protected content
  return <>{children}</>;
};

export default ProtectedRoute;