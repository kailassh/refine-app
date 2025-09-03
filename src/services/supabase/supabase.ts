/**
 * Supabase service layer for real authentication.
 * 
 * This service provides a clean interface for interacting with Supabase
 * authentication. It handles email OTP sending, verification, session 
 * management, and error handling using the real Supabase client.
 * 
 * @fileoverview Supabase authentication service
 */

import { 
  type SupabaseSignInWithOtpResponse,
  type SupabaseVerifyOtpResponse,
  type SupabaseMCPResult,
  type SupabaseSignInOptions,
  type SupabaseUser,
  type SupabaseSession,
  type User,
  type AuthErrorCode
} from '../../types/auth';
import { supabase } from './client';
import { errorService } from '../error';

/**
 * Supabase authentication service class.
 * 
 * Provides methods for email OTP authentication using Supabase MCP functions.
 * Handles error processing and response transformation.
 */
export class SupabaseAuthService {
  /**
   * Sends an OTP code to the specified email address.
   * 
   * Uses a two-step strategy for user authentication:
   * 1. First, try signInWithOtp with shouldCreateUser: false (for existing users)
   * 2. If user doesn't exist, try signInWithOtp with shouldCreateUser: true (create new user)
   * 
   * @param email - Email address to send OTP to
   * @param options - Additional options for the sign-in process
   * @returns Promise resolving to the response data or error
   */
  static async sendOTPToEmail(
    email: string, 
    options: SupabaseSignInOptions = {}
  ): Promise<SupabaseMCPResult<SupabaseSignInWithOtpResponse>> {
    try {
      // Step 1: Try signInWithOtp for existing users
      const { data: firstAttemptData, error: firstAttemptError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false, // Don't create user - existing users only
          emailRedirectTo: options.emailRedirectTo,
        }
      });

      // If successful, return the result (existing user got OTP)
      if (!firstAttemptError) {
        errorService.info('OTP email sent to existing user', 'SupabaseAuth');
        return {
          data: {
            user: firstAttemptData.user as SupabaseUser | null,
            session: firstAttemptData.session as SupabaseSession | null
          }
        };
      }

      // If error is NOT about user not existing, return the error
      if (!this.isUserNotFoundError(firstAttemptError)) {
        return {
          error: {
            message: this.formatErrorMessage(firstAttemptError),
            code: this.mapErrorToCode(firstAttemptError)
          }
        };
      }

      errorService.info('User not found - creating new user', 'SupabaseAuth');

      // Step 2: Try signInWithOtp with user creation enabled
      const { data: secondAttemptData, error: secondAttemptError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true, // Allow user creation for new users
          emailRedirectTo: options.emailRedirectTo,
        }
      });

      if (secondAttemptError) {
        return {
          error: {
            message: this.formatErrorMessage(secondAttemptError),
            code: this.mapErrorToCode(secondAttemptError)
          }
        };
      }

      errorService.info('New user created - OTP email sent', 'SupabaseAuth');
      return {
        data: {
          user: secondAttemptData.user as SupabaseUser | null,
          session: secondAttemptData.session as SupabaseSession | null
        }
      };

    } catch (error) {
      return {
        error: {
          message: error instanceof Error ? error.message : 'Failed to send OTP',
          code: 'SEND_OTP_ERROR' as AuthErrorCode
        }
      };
    }
  }

  /**
   * Verifies the OTP code entered by the user.
   * 
   * Uses Supabase verifyOtp to validate the OTP code
   * and create an authenticated session.
   * 
   * @param email - Email address used for OTP
   * @param token - 6-digit OTP code
   * @param type - OTP type (default: 'email')
   * @returns Promise resolving to the verified session or error
   */
  static async verifyOTPCode(
    email: string,
    token: string
  ): Promise<SupabaseMCPResult<SupabaseVerifyOtpResponse>> {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email' // Force to email type for now
      });

      if (error) {
        return {
          error: {
            message: this.formatErrorMessage(error),
            code: this.mapErrorToCode(error)
          }
        };
      }

      // Store session for persistence
      if (data.session) {
        this.storeSession({
          access_token: data.session.access_token,
          token_type: data.session.token_type,
          expires_in: data.session.expires_in,
          refresh_token: data.session.refresh_token,
          user: data.user || data.session.user
        } as SupabaseSession);
      }

      return {
        data: {
          user: data.user as SupabaseUser | null,
          session: data.session as SupabaseSession | null
        }
      };
    } catch (error) {
      return {
        error: {
          message: error instanceof Error ? error.message : 'Failed to verify OTP',
          code: 'VERIFY_OTP_ERROR' as AuthErrorCode
        }
      };
    }
  }

  /**
   * Signs out the current user session.
   * 
   * Uses Supabase signOut to invalidate the current session.
   * 
   * @returns Promise resolving to success or error
   */
  static async signOut(): Promise<SupabaseMCPResult<void>> {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        return {
          error: {
            message: this.formatErrorMessage(error),
            code: 'SIGN_OUT_ERROR' as AuthErrorCode
          }
        };
      }

      // Clear stored session
      this.clearStoredSession();

      return { data: undefined };
    } catch (error) {
      return {
        error: {
          message: error instanceof Error ? error.message : 'Failed to sign out',
          code: 'SIGN_OUT_ERROR' as AuthErrorCode
        }
      };
    }
  }

  /**
   * Transforms a Supabase user object to our application User type.
   * 
   * @param supabaseUser - User object from Supabase response
   * @returns Transformed user object for our application
   */
  static transformSupabaseUser(supabaseUser: SupabaseUser): User {
    return {
      id: supabaseUser.id,
      email: supabaseUser.email,
      emailConfirmed: !!supabaseUser.email_confirmed_at,
      createdAt: supabaseUser.created_at,
      lastSignInAt: supabaseUser.last_sign_in_at,
      name: (supabaseUser.user_metadata?.name as string) || (supabaseUser.user_metadata?.full_name as string),
      avatar: supabaseUser.user_metadata?.avatar_url as string
    };
  }

  /**
   * Stores session data in localStorage for persistence.
   * 
   * @param session - Supabase session to store
   */
  static storeSession(session: SupabaseSession): void {
    try {
      localStorage.setItem('supabase_session', JSON.stringify(session));
    } catch (error) {
      errorService.warn('Failed to store session in localStorage', 'SupabaseAuth', error);
    }
  }

  /**
   * Retrieves stored session data from Supabase client.
   * 
   * @returns Current session or null if not found/expired
   */
  static async getStoredSession(): Promise<SupabaseSession | null> {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        errorService.warn('Failed to retrieve session from Supabase', 'SupabaseAuth', error);
        return null;
      }

      return session as SupabaseSession | null;
    } catch (error) {
      errorService.warn('Failed to retrieve session', 'SupabaseAuth', error);
      return null;
    }
  }

  /**
   * Clears stored session data.
   */
  static clearStoredSession(): void {
    try {
      // Session is automatically cleared by supabase.auth.signOut()
      // but we can also manually clear localStorage if needed
      localStorage.removeItem('sb-dekxjqitigrjlnfrotqb-auth-token');
    } catch (error) {
      errorService.warn('Failed to clear session data', 'SupabaseAuth', error);
    }
  }

  /**
   * Formats Supabase error messages for user display.
   * 
   * @param error - Error object from Supabase
   * @returns User-friendly error message
   */
  static formatErrorMessage(error: unknown): string {
    if (typeof error === 'string') return error;
    
    if (error && typeof error === 'object' && 'message' in error) {
      const message = (error as { message: string }).message.toLowerCase();
      
      if (message.includes('email rate limit exceeded')) {
        return 'Too many requests. Please wait a moment before trying again.';
      }
      if (message.includes('invalid email')) {
        return 'Please enter a valid email address.';
      }
      if (message.includes('token expired') || message.includes('expired')) {
        return 'The verification code has expired. Please request a new one.';
      }
      if (message.includes('invalid token') || message.includes('invalid otp')) {
        return 'Invalid verification code. Please check and try again.';
      }
      if (message.includes('user not found')) {
        return 'No account found with this email address.';
      }
      if (message.includes('signups not allowed') || 
          message.includes('not allowed for otp') || 
          message.includes('otp signups disabled')) {
        return 'Unable to create account. Please contact support.';
      }
      
      return (error as { message: string }).message;
    }
    
    return 'An unexpected error occurred. Please try again.';
  }

  /**
   * Checks if an error indicates that the user was not found.
   * 
   * @param error - Error object from Supabase
   * @returns True if error indicates user not found
   */
  static isUserNotFoundError(error: unknown): boolean {
    if (!error || typeof error !== 'object' || !('message' in error)) return false;
    
    const message = (error as { message: string }).message.toLowerCase();
    return message.includes('user not found') || 
           message.includes('invalid login credentials') ||
           message.includes('email not confirmed') ||
           message.includes('user does not exist') ||
           message.includes('signup is disabled') ||
           message.includes('signups not allowed') ||
           message.includes('not allowed for otp') ||
           message.includes('otp signups disabled') ||
           message.includes('email address not found');
  }

  /**
   * Maps Supabase error messages to standardized error codes.
   * 
   * @param error - Error object from Supabase
   * @returns Standardized error code
   */
  static mapErrorToCode(error: unknown): AuthErrorCode {
    if (!error || typeof error !== 'object' || !('message' in error)) {
      return 'SEND_OTP_ERROR';
    }
    
    const message = (error as { message: string }).message.toLowerCase();
    
    if (message.includes('rate limit')) return 'RATE_LIMIT_ERROR';
    if (message.includes('expired') || message.includes('token expired')) return 'TOKEN_EXPIRED';
    if (message.includes('invalid token') || message.includes('invalid otp')) return 'INVALID_TOKEN';
    if (message.includes('user not found') || message.includes('email address not found')) return 'USER_NOT_FOUND';
    if (message.includes('email not confirmed')) return 'EMAIL_NOT_CONFIRMED';
    if (message.includes('invalid login credentials')) return 'INVALID_CREDENTIALS';
    if (message.includes('already registered') || message.includes('already exists')) return 'USER_CREATION_ERROR';
    if (message.includes('signups not allowed') || 
        message.includes('signup is disabled') || 
        message.includes('not allowed for otp') ||
        message.includes('otp signups disabled')) return 'SIGNUPS_DISABLED';
    
    return 'SEND_OTP_ERROR';
  }


  /**
   * Gets the recommended Magic Link email template configuration for OTP.
   * 
   * This template should be configured in the Supabase Dashboard under
   * Authentication > Email Templates > Magic Link to ensure users receive
   * OTP codes instead of confirmation links.
   * 
   * @returns Recommended email template configuration
   */
  static getRecommendedOTPEmailTemplate(): {
    subject: string;
    content: string;
    instructions: string;
  } {
    return {
      subject: 'Your Login Code',
      content: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #333;">Your Login Code</h2>
  
  <p>Hello,</p>
  
  <p>You've requested to sign in to refine. Please use the following 6-digit code:</p>
  
  <div style="background-color: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
    <h3 style="font-size: 32px; letter-spacing: 4px; margin: 0; color: #333;">{{ .Token }}</h3>
  </div>
  
  <p>This code will expire in 5 minutes. If you didn't request this code, please ignore this email.</p>
  
  <p>Best regards,<br>
  The refine team</p>
</div>
      `.trim(),
      instructions: `
To configure this template:
1. Go to your Supabase Dashboard
2. Navigate to Authentication > Email Templates
3. Select "Magic Link" template
4. Replace the content with the template above
5. Make sure to include {{ .Token }} variable for the OTP code
6. Save the changes

This ensures that signInWithOtp sends OTP codes instead of magic links.
      `.trim()
    };
  }
}

export default SupabaseAuthService;