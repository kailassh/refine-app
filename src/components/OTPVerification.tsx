/**
 * OTPVerification component - Handles 6-digit OTP verification.
 * 
 * This component provides the OTP verification interface including
 * a 6-digit input field, timer countdown, resend functionality, and
 * comprehensive error handling. It follows accessibility best practices
 * and includes proper validation and user feedback.
 * 
 * @fileoverview OTP verification component with timer and validation
 */

import React, { useState, useRef, useEffect, type FormEvent, type KeyboardEvent } from 'react';
import { Timer } from './Timer';
import { Button } from './Button';
import { type OTPFormData, type ValidationErrors, type OTPTimerState } from '../types/auth';

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
    <div className="w-full max-w-md space-y-8">
      {/* Header Section */}
      <div className="space-y-text text-center">
        <h1 className="heading-primary">
          Check your email
        </h1>
        <div className="space-y-2">
          <p className="text-description">
            We sent a 6-digit code to
          </p>
          <p className="text-base font-medium text-gray-900">
            {email}
          </p>
        </div>
      </div>

      {/* Timer Section */}
      <div className="flex justify-center">
        <Timer 
          timeRemaining={timerState.timeRemaining}
          isActive={timerState.isActive}
          totalDuration={120}
        />
      </div>

      {/* OTP Form Section */}
      <div className="space-y-form">
        <form onSubmit={handleOTPSubmit} className="space-y-form">
          {/* OTP Input Field */}
          <div className="text-center">
            <label htmlFor="otp" className="input-label sr-only">
              6-digit verification code
            </label>
            <input
              ref={otpInputRef}
              id="otp"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              placeholder="000000"
              value={formData.otp}
              onChange={handleOTPChange}
              onKeyDown={handleKeyPress}
              onPaste={handleOTPPaste}
              disabled={isLoading}
              className={`
                w-full max-w-48 mx-auto
                px-6 py-4
                text-2xl font-mono text-center tracking-widest
                border rounded-lg
                ${validationErrors.otp 
                  ? 'border-red-300' 
                  : 'border-gray-300'
                }
                transition-colors duration-200
                focus:outline-none focus:ring-2 focus:border-transparent
                ${validationErrors.otp 
                  ? 'focus:ring-red-500' 
                  : 'focus:ring-gray-500'
                }
                disabled:bg-gray-50 disabled:cursor-not-allowed
              `}
              aria-label="6-digit verification code"
              autoComplete="one-time-code"
              autoFocus
            />
            {/* Field Error Message */}
            {validationErrors.otp && (
              <p className="input-error-message text-center mt-2" role="alert">
                {validationErrors.otp}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            disabled={isLoading || !!validationErrors.otp || formData.otp.length !== 6}
            className="w-full"
          >
            {isLoading ? 'Verifying...' : 'Verify code'}
          </Button>
        </form>
      </div>

      {/* Error Message Display */}
      {error && (
        <div className="text-center">
          <p className="input-error-message" role="alert">
            {error}
          </p>
        </div>
      )}

      {/* Action Buttons Section */}
      <div className="space-y-form">
        {/* Resend Button */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleResendClick}
            disabled={!timerState.canResend || isLoading}
            className={`
              px-2 py-1
              text-sm font-medium
              rounded
              ${timerState.canResend && !isLoading
                ? 'text-gray-900 cursor-pointer'
                : 'text-gray-400 cursor-not-allowed'
              }
              transition-colors duration-200
              ${timerState.canResend && !isLoading
                ? 'hover:text-gray-700'
                : ''
              }
              focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
            `}
            aria-label={timerState.canResend ? 'Resend verification code' : 'Resend not available'}
          >
            {timerState.canResend 
              ? "Didn't receive the code? Resend"
              : `Resend in ${Math.floor(timerState.timeRemaining / 60)}:${(timerState.timeRemaining % 60).toString().padStart(2, '0')}`
            }
          </button>
        </div>

        {/* Go Back Button */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleGoBackClick}
            disabled={isLoading}
            className="px-2 py-1 text-sm rounded text-gray-500 transition-colors duration-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            aria-label="Go back to email input"
          >
            ← Use a different email
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;