/**
 * Custom hook for managing user authentication state and operations.
 * 
 * This hook provides a centralized way to handle authentication logic
 * including email/OTP login, logout, and authentication state management.
 * It integrates with Supabase authentication using the MCP connection.
 * 
 * @returns Authentication state and methods for auth operations
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { authState, loginWithEmail, verifyOTP, logout } = useAuth();
 *   
 *   const handleLogin = async () => {
 *     await loginWithEmail('user@example.com');
 *   };
 *   
 *   if (authState.isAuthenticated) {
 *     return <div>Welcome! <button onClick={logout}>Logout</button></div>;
 *   }
 *   
 *   return <LoginForm onSubmit={handleLogin} />;
 * }
 * ```
 */

import { useState, useCallback, useEffect } from 'react';
import { type AuthState } from '../types/auth';
import { useSupabaseAuth } from './useSupabaseAuth';
import SupabaseAuthService from '../services/supabase';

export const useAuth = () => {
  // Initialize authentication state with default values
  const [authState, setAuthState] = useState<AuthState>({
    isLoading: false,
    error: null,
    isAuthenticated: false,
    authStep: 'email_input',
    user: null,
    pendingEmail: null,
    otpTimer: {
      timeRemaining: 0,
      isActive: false,
      canResend: true
    }
  });

  // Timer interval reference
  const [timerInterval, setTimerInterval] = useState<ReturnType<typeof setInterval> | null>(null);

  // Supabase authentication hook
  const supabaseAuth = useSupabaseAuth();

  /**
   * Stops the OTP countdown timer.
   */
  const stopOTPTimer = useCallback(() => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  }, [timerInterval]);

  /**
   * Starts the OTP countdown timer.
   */
  const startOTPTimer = useCallback(() => {
    stopOTPTimer(); // Clear any existing timer
    
    setAuthState(prev => ({
      ...prev,
      otpTimer: {
        timeRemaining: 120, // 2 minutes
        isActive: true,
        canResend: false
      }
    }));
    
    const interval = setInterval(() => {
      setAuthState(prev => {
        const newTimeRemaining = prev.otpTimer.timeRemaining - 1;
        
        if (newTimeRemaining <= 0) {
          clearInterval(interval);
          return {
            ...prev,
            otpTimer: {
              timeRemaining: 0,
              isActive: false,
              canResend: true
            }
          };
        }
        
        return {
          ...prev,
          otpTimer: {
            ...prev.otpTimer,
            timeRemaining: newTimeRemaining
          }
        };
      });
    }, 1000);
    
    setTimerInterval(interval);
  }, [stopOTPTimer]);

  /**
   * Attempts to send OTP to user's email address using Supabase.
   * 
   * This function makes a call to Supabase to send an OTP to the provided
   * email address. On success, it transitions to the OTP verification step
   * and starts the countdown timer.
   * 
   * @param email - The user's email address for OTP delivery
   */
  const loginWithEmail = useCallback(async (email: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await supabaseAuth.sendOTPToEmail(email);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to send OTP');
      }
      
      // Start OTP timer (2 minutes = 120 seconds)
      startOTPTimer();
      
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: null,
        authStep: 'otp_verification',
        pendingEmail: email
      }));
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to send OTP. Please try again.',
      }));
    }
  }, [startOTPTimer, supabaseAuth]);

  /**
   * Verifies the OTP code entered by the user.
   * 
   * This function validates the OTP against Supabase and completes
   * the authentication process if successful.
   * 
   * @param otpCode - The 6-digit OTP code entered by the user
   */
  const verifyOTP = useCallback(async (otpCode: string) => {
    if (!authState.pendingEmail) {
      setAuthState(prev => ({
        ...prev,
        error: 'No email found for verification. Please start over.'
      }));
      return;
    }

    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await supabaseAuth.verifyOTPCode(authState.pendingEmail, otpCode);
      
      if (!result.success || !result.user) {
        throw new Error(result.error || 'Failed to verify OTP');
      }
      
      // Clear timer
      stopOTPTimer();
      
      setAuthState({
        isLoading: false,
        error: null,
        isAuthenticated: true,
        authStep: 'authenticated',
        user: result.user,
        pendingEmail: null,
        otpTimer: {
          timeRemaining: 0,
          isActive: false,
          canResend: true
        }
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to verify OTP. Please try again.',
      }));
    }
  }, [authState.pendingEmail, stopOTPTimer, supabaseAuth]);

  /**
   * Resends OTP to the pending email address.
   * 
   * This function allows users to request a new OTP if the previous one
   * expired or was not received.
   */
  const resendOTP = useCallback(async () => {
    if (!authState.pendingEmail) {
      setAuthState(prev => ({
        ...prev,
        error: 'No email found for resending OTP. Please start over.'
      }));
      return;
    }

    await loginWithEmail(authState.pendingEmail);
  }, [authState.pendingEmail, loginWithEmail]);

  /**
   * Returns to the email input step from OTP verification.
   */
  const goBackToEmail = useCallback(() => {
    stopOTPTimer();
    setAuthState(prev => ({
      ...prev,
      authStep: 'email_input',
      pendingEmail: null,
      error: null,
      otpTimer: {
        timeRemaining: 0,
        isActive: false,
        canResend: true
      }
    }));
  }, [stopOTPTimer]);

  /**
   * Logs out the current user by resetting authentication state.
   * 
   * This function clears the authentication state and returns the user
   * to the unauthenticated state. It also clears any running timers.
   */
  const logout = useCallback(async () => {
    stopOTPTimer();
    
    try {
      await supabaseAuth.signOut();
    } catch (error) {
      console.error('Error during logout:', error);
    }
    
    // Reset authentication state to initial values
    setAuthState({
      isLoading: false,
      error: null,
      isAuthenticated: false,
      authStep: 'email_input',
      user: null,
      pendingEmail: null,
      otpTimer: {
        timeRemaining: 0,
        isActive: false,
        canResend: true
      }
    });
  }, [stopOTPTimer, supabaseAuth]);

  // Initialize auth state from stored session on mount
  useEffect(() => {
    const initializeAuth = () => {
      const storedSession = SupabaseAuthService.getStoredSession();
      if (storedSession && storedSession.user) {
        const user = SupabaseAuthService.transformSupabaseUser(storedSession.user);
        setAuthState(prev => ({
          ...prev,
          isAuthenticated: true,
          authStep: 'authenticated',
          user,
          isLoading: false
        }));
      }
    };

    initializeAuth();
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      stopOTPTimer();
    };
  }, [stopOTPTimer]);

  // Return authentication state and methods for use by components
  return {
    authState,      // Current authentication state (loading, error, authenticated, step, etc.)
    loginWithEmail, // Function to send OTP to email
    verifyOTP,      // Function to verify OTP code
    resendOTP,      // Function to resend OTP
    logout,         // Function to log out the user
    goBackToEmail,  // Function to return to email input step
  };
};