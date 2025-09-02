/**
 * Error boundary component for catching React errors.
 * 
 * This component catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree
 * that crashed.
 */

import React, { Component, type ReactNode } from 'react';
import { Box, Typography, Button, Stack, Alert } from '@mui/material';
import { ErrorOutline as ErrorOutlineIcon } from '@mui/icons-material';

/**
 * Props interface for ErrorBoundary component.
 */
interface ErrorBoundaryProps {
  /** Child components to render */
  children: ReactNode;
  /** Optional fallback UI to render when error occurs */
  fallback?: ReactNode;
  /** Optional callback when error occurs */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

/**
 * State interface for ErrorBoundary component.
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary class component.
 * 
 * Catches errors in child components and displays fallback UI.
 * This is a class component because React error boundaries must be class components.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  /**
   * Static method to update state when error is caught.
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  /**
   * Component lifecycle method called when error is caught.
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Call optional error callback
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  /**
   * Reset error state to try rendering again.
   */
  resetError = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Render custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 384,
            p: 4,
            textAlign: 'center'
          }}
        >
          <Box sx={{ maxWidth: 448, mx: 'auto' }}>
            <ErrorOutlineIcon
              sx={{
                width: 64,
                height: 64,
                mx: 'auto',
                mb: 2,
                color: 'error.main'
              }}
            />
            
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 600, 
                color: 'text.primary', 
                mb: 1 
              }}
            >
              Something went wrong
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'text.secondary', 
                mb: 3 
              }}
            >
              We're sorry, but something unexpected happened. Please try again.
            </Typography>
            
            <Stack spacing={1.5}>
              <Button
                variant="contained"
                onClick={this.resetError}
                fullWidth
              >
                Try again
              </Button>
              
              <Button
                variant="outlined"
                onClick={() => window.location.reload()}
                fullWidth
              >
                Reload page
              </Button>
            </Stack>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mt: 3, 
                  textAlign: 'left',
                  '& .MuiAlert-message': {
                    width: '100%'
                  }
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                  Error details (development only)
                </Typography>
                <Box
                  component="pre"
                  sx={{
                    fontSize: '0.75rem',
                    color: 'error.dark',
                    overflow: 'auto',
                    p: 2,
                    backgroundColor: 'error.light',
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'error.main',
                    fontFamily: 'monospace',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {this.state.error.toString()}
                </Box>
              </Alert>
            )}
          </Box>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;