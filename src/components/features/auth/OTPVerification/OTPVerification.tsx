/**
 * OTPVerification component - Handles 6-digit OTP verification.
 * 
 * This component provides the OTP verification interface including
 * a 6-digit input field, timer countdown, resend functionality, and
 * comprehensive error handling. It follows accessibility best practices
 * and includes proper validation and user feedback.
 * 
 * @fileoverview OTP verification component with timer and validation using MUI
 */

import React, { useState, useRef, useEffect, type FormEvent, type KeyboardEvent } from 'react';
import { Timer } from '../../../shared/Timer';
import { 
  Button, 
  TextField, 
  Stack, 
  CircularProgress,
  Box,
  Typography
} from '@mui/material';
import { type OTPFormData, type ValidationErrors, type OTPTimerState } from '../../../../types/auth';

/**
 * Props interface for the OTPVerification component.
 */
interface OTPVerificationProps {
  /** Email address where OTP was sent */
  email: string;
  /** Callback function triggered when OTP is submitted for verification */
  onVerifyOTP?: (otp: string) => Promise<void>;
  /** Callback function triggered when user wants to resend OTP */
  onResendOTP?: () => Promise<void>;
  /** Callback function triggered when user wants to go back to email input */
  onGoBack?: () => void;
  /** Whether verification is currently in progress */
  isLoading?: boolean;
  /** Error message to display if verification fails */
  error?: string | null;
  /** Timer state for countdown and resend functionality */
  timerState: OTPTimerState;
}

/**
 * Validates OTP code format and required field.
 * 
 * @param otp - The OTP string to validate
 * @returns Error message if validation fails, undefined if valid
 */
const validateOTP = (otp: string): string | undefined => {
  if (!otp.trim()) {
    return 'Verification code is required';
  }
  
  if (otp.length !== 6) {
    return 'Verification code must be 6 digits';
  }
  
  if (!/^\d{6}$/.test(otp)) {
    return 'Verification code must contain only numbers';
  }
  
  return undefined;
};

/**
 * OTPVerification functional component.
 * 
 * Renders the complete OTP verification interface including header,
 * 6-digit input field, timer, resend functionality, and navigation.
 * Manages its own form state and validation while communicating with
 * parent components through callbacks.
 * 
 * @param props - Component props including callbacks and state
 * @returns JSX element representing the OTP verification page
 */
export const OTPVerification: React.FC<OTPVerificationProps> = ({
  email,
  onVerifyOTP,
  onResendOTP,
  onGoBack,
  isLoading = false,
  error = null,
  timerState
}) => {
  // Form data state
  const [formData, setFormData] = useState<OTPFormData>({ otp: '' });
  
  // Validation errors state
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  
  // Interaction tracking
  const [hasInteracted, setHasInteracted] = useState(false);
  
  // Input reference for focus management
  const otpInputRef = useRef<HTMLInputElement>(null);
  
  // Auto-focus input on component mount
  useEffect(() => {
    if (otpInputRef.current) {
      otpInputRef.current.focus();
    }
  }, []);

  /**
   * Handles OTP input field changes.
   * 
   * @param e - React change event from OTP input
   */
  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let otp = e.target.value;
    
    // Only allow numbers and limit to 6 digits
    otp = otp.replace(/\D/g, '').slice(0, 6);
    
    setFormData({ otp });
    
    // Real-time validation if user has interacted
    if (hasInteracted) {
      const otpError = validateOTP(otp);
      setValidationErrors({ otp: otpError });
    }
  };

  /**
   * Handles paste events for OTP input.
   * 
   * @param e - Clipboard paste event
   */
  const handleOTPPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    // Get pasted text from clipboard
    const pastedText = e.clipboardData.getData('text');
    
    // Extract only digits from pasted content and limit to 6 characters
    const otpFromPaste = pastedText.replace(/\D/g, '').slice(0, 6);
    
    if (otpFromPaste) {
      setFormData({ otp: otpFromPaste });
      
      // Validate the pasted OTP if user has interacted
      if (hasInteracted || otpFromPaste.length === 6) {
        const otpError = validateOTP(otpFromPaste);
        setValidationErrors({ otp: otpError });
      }
      
      // Mark as interacted since user pasted content
      if (!hasInteracted) {
        setHasInteracted(true);
      }
    }
  };

  /**
   * Handles key press events for better UX.
   * 
   * @param e - Keyboard event
   */
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    // Allow paste operations (Ctrl+V or Cmd+V)
    if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
      return; // Allow paste
    }
    
    // Only allow numbers and navigation keys
    if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
      e.preventDefault();
    }
  };

  /**
   * Handles form submission for OTP verification.
   * 
   * @param e - Form submission event
   */
  const handleOTPSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    setHasInteracted(true);
    
    const otpError = validateOTP(formData.otp);
    setValidationErrors({ otp: otpError });
    
    if (!otpError && onVerifyOTP) {
      await onVerifyOTP(formData.otp);
    }
  };

  /**
   * Handles resend OTP button click.
   */
  const handleResendClick = async () => {
    if (onResendOTP && timerState.canResend) {
      // Clear form and errors when resending
      setFormData({ otp: '' });
      setValidationErrors({});
      setHasInteracted(false);
      
      await onResendOTP();
      
      // Refocus input
      setTimeout(() => {
        if (otpInputRef.current) {
          otpInputRef.current.focus();
        }
      }, 100);
    }
  };

  /**
   * Handles go back button click.
   */
  const handleGoBackClick = () => {
    if (onGoBack) {
      onGoBack();
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 448, mx: 'auto' }}>
      {/* Header Section */}
      <Stack spacing={6} sx={{ textAlign: 'center', mb: 4 }}>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 500,
            color: 'text.primary'
          }}
        >
          Check your email
        </Typography>
        <Stack spacing={1}>
          <Typography 
            variant="h6"
            sx={{ color: 'text.secondary' }}
          >
            We sent a 6-digit code to
          </Typography>
          <Typography 
            variant="body1"
            sx={{ 
              fontWeight: 500,
              color: 'text.primary'
            }}
          >
            {email}
          </Typography>
        </Stack>
      </Stack>

      {/* Timer Section */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Timer 
          timeRemaining={timerState.timeRemaining}
          isActive={timerState.isActive}
          totalDuration={120}
        />
      </Box>

      {/* OTP Form Section */}
      <Stack spacing={2} sx={{ mb: 4 }}>
        <form onSubmit={handleOTPSubmit}>
          <Stack spacing={2}>
            {/* OTP Input Field */}
            <Box sx={{ textAlign: 'center' }}>
            <label htmlFor="otp" className="sr-only">
              6-digit verification code
            </label>
            <TextField
              inputRef={otpInputRef}
              id="otp"
              type="text"
              inputMode="numeric"
              inputProps={{
                pattern: "[0-9]*",
                maxLength: 6,
                style: {
                  textAlign: 'center',
                  fontSize: '1.5rem',
                  fontFamily: 'monospace',
                  letterSpacing: '0.5em',
                  paddingLeft: '0.25em'
                }
              }}
              placeholder="000000"
              value={formData.otp}
              onChange={handleOTPChange}
              onKeyDown={handleKeyPress}
              onPaste={handleOTPPaste}
              disabled={isLoading}
              error={!!validationErrors.otp}
              helperText={validationErrors.otp}
              sx={{
                width: '100%',
                maxWidth: 240,
                mx: 'auto',
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&.Mui-error fieldset': {
                    borderColor: 'error.main',
                  },
                },
              }}
              aria-label="6-digit verification code"
              autoComplete="one-time-code"
              autoFocus
            />
            </Box>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading || !!validationErrors.otp || formData.otp.length !== 6}
              fullWidth
              size="large"
              sx={{ py: 1.5, fontWeight: 500, mt: 2 }}
            >
              {isLoading ? (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CircularProgress size={16} sx={{ color: 'inherit' }} />
                  <span>Verifying...</span>
                </Stack>
              ) : (
                'Verify code'
              )}
            </Button>
          </Stack>
        </form>
      </Stack>

      {/* Error Message Display */}
      {error && (
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography 
            variant="body2" 
            sx={{ color: 'error.main' }}
            role="alert"
          >
            {error}
          </Typography>
        </Box>
      )}

      {/* Action Buttons Section */}
      <Stack spacing={2}>
        {/* Resend Button */}
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="text"
            onClick={handleResendClick}
            disabled={!timerState.canResend || isLoading}
            sx={{
              px: 1,
              py: 0.5,
              fontSize: '0.875rem',
              fontWeight: 500,
              color: timerState.canResend && !isLoading ? 'text.primary' : 'text.disabled',
              '&:hover': {
                backgroundColor: 'transparent',
                color: timerState.canResend && !isLoading ? 'text.secondary' : 'text.disabled'
              }
            }}
            aria-label={timerState.canResend ? 'Resend verification code' : 'Resend not available'}
          >
            {timerState.canResend 
              ? "Didn't receive the code? Resend"
              : `Resend in ${Math.floor(timerState.timeRemaining / 60)}:${(timerState.timeRemaining % 60).toString().padStart(2, '0')}`
            }
          </Button>
        </Box>

        {/* Go Back Button */}
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="text"
            onClick={handleGoBackClick}
            disabled={isLoading}
            sx={{
              px: 1,
              py: 0.5,
              fontSize: '0.875rem',
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'transparent',
                color: 'text.primary'
              }
            }}
            aria-label="Go back to email input"
          >
            ← Use a different email
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default OTPVerification;