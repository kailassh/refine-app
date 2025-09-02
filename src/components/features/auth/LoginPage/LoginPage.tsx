/**
 * LoginPage component - The main authentication interface.
 * 
 * This component provides the primary login interface for the application,
 * including email validation, form submission, and error handling. It follows
 * accessibility best practices and includes comprehensive user feedback.
 * 
 * @fileoverview Main login page component with email authentication using MUI components
 */

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  CircularProgress, 
  Alert, 
  Stack 
} from '@mui/material';

/**
 * Form validation schema using Zod.
 */
const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .regex(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Please enter a valid email address'
    ),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

/**
 * Props interface for the LoginPage component.
 * 
 * Defines the callback functions and state that can be passed to the component
 * from parent components, typically the main App component.
 */
interface LoginPageProps {
  /** Callback function triggered when user submits email for OTP sending */
  onEmailLogin?: (email: string) => Promise<void>;
  /** Whether a login attempt is currently in progress */
  isLoading?: boolean;
  /** Error message to display if login fails */
  error?: string | null;
}

/**
 * LoginPage functional component.
 * 
 * Renders the complete login interface using MUI components with
 * react-hook-form for validation and form state management.
 * 
 * @param props - Component props including callbacks and state
 * @returns JSX element representing the login page
 */
export const LoginPage: React.FC<LoginPageProps> = ({
  onEmailLogin,
  isLoading = false,
  error = null
}) => {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
    },
  });

  /**
   * Handles form submission for email login.
   */
  const onSubmit = async (values: LoginFormValues) => {
    if (onEmailLogin) {
      await onEmailLogin(values.email.trim());
    }
  };

  return (
    <Stack spacing={4}>
      {/* Welcome Section - Application title and description */}
      <Stack spacing={3} sx={{ textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 500, color: 'text.primary' }}>
          Welcome to refine
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400 }}>
          Refine anything you type or paste
        </Typography>
      </Stack>

      {/* Email Form Section - Login form using MUI components */}
      <Stack spacing={2}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="email"
                  label="Email address"
                  placeholder="Type your email"
                  disabled={isLoading}
                  autoComplete="email"
                  autoFocus
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiInputLabel-root': {
                      fontSize: '0.875rem',
                      fontWeight: 500,
                    },
                    '& .MuiInputBase-input': {
                      fontSize: '1rem',
                    },
                  }}
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              fullWidth
              size="large"
              sx={{
                py: 1.5,
                fontWeight: 500,
                textTransform: 'none',
              }}
            >
              {isLoading ? (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CircularProgress size={16} sx={{ color: 'inherit' }} />
                  <span>Continuing...</span>
                </Stack>
              ) : (
                'Continue with email'
              )}
            </Button>
          </Stack>
        </Box>
      </Stack>

      {/* Error Message Display - Shows authentication errors */}
      {error && (
        <Alert severity="error" sx={{ textAlign: 'center' }}>
          {error}
        </Alert>
      )}
    </Stack>
  );
};

export default LoginPage;