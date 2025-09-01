/**
 * Supabase service layer for MCP integration.
 * 
 * This service provides a clean interface for interacting with Supabase
 * authentication through MCP functions. It handles email OTP sending,
 * verification, session management, and error handling.
 * 
 * @fileoverview Supabase MCP integration service
 */

import { 
  type SupabaseSignInWithOtpResponse,
  type SupabaseVerifyOtpResponse,
  type SupabaseMCPResult,
  type SupabaseSignInOptions,
  type SupabaseUser,
  type SupabaseSession,
  type SupabaseOtpType,
  type User
} from '../types/auth';

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
   * Uses Supabase signInWithOtp MCP function to send an email with
   * a 6-digit verification code to the user.
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
      // Note: This function should be called from a component that has access to MCP tools
      // The actual implementation will be in the component level
      console.log('Sending OTP to:', email, 'with options:', options);
      throw new Error('This method should be overridden at the component level with MCP access');
    } catch (error) {
      return {
        error: {
          message: error instanceof Error ? error.message : 'Failed to send OTP',
          code: 'SEND_OTP_ERROR'
        }
      };
    }
  }

  /**
   * Verifies the OTP code entered by the user.
   * 
   * Uses Supabase verifyOtp MCP function to validate the OTP code
   * and create an authenticated session.
   * 
   * @param email - Email address used for OTP
   * @param token - 6-digit OTP code
   * @param type - OTP type (default: 'email')
   * @returns Promise resolving to the verified session or error
   */
  static async verifyOTPCode(
    email: string,
    token: string,
    type: SupabaseOtpType = 'email'
  ): Promise<SupabaseMCPResult<SupabaseVerifyOtpResponse>> {
    try {
      // Note: This function should be called from a component that has access to MCP tools
      // The actual implementation will be in the component level
      console.log('Verifying OTP for:', email, 'token:', token, 'type:', type);
      throw new Error('This method should be overridden at the component level with MCP access');
    } catch (error) {
      return {
        error: {
          message: error instanceof Error ? error.message : 'Failed to verify OTP',
          code: 'VERIFY_OTP_ERROR'
        }
      };
    }
  }

  /**
   * Signs out the current user session.
   * 
   * Uses Supabase signOut MCP function to invalidate the current session.
   * 
   * @returns Promise resolving to success or error
   */
  static async signOut(): Promise<SupabaseMCPResult<void>> {
    try {
      // Note: This function should be called from a component that has access to MCP tools
      // The actual implementation will be in the component level
      throw new Error('This method should be overridden at the component level with MCP access');
    } catch (error) {
      return {
        error: {
          message: error instanceof Error ? error.message : 'Failed to sign out',
          code: 'SIGN_OUT_ERROR'
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
      console.warn('Failed to store session in localStorage:', error);
    }
  }

  /**
   * Retrieves stored session data from localStorage.
   * 
   * @returns Stored session or null if not found/expired
   */
  static getStoredSession(): SupabaseSession | null {
    try {
      const storedSession = localStorage.getItem('supabase_session');
      if (!storedSession) return null;

      const session: SupabaseSession = JSON.parse(storedSession);
      
      // Check if session is expired
      const now = Math.floor(Date.now() / 1000);
      const expiresAt = Math.floor(Date.now() / 1000) + session.expires_in;
      
      if (now >= expiresAt) {
        // Session expired, remove it
        localStorage.removeItem('supabase_session');
        return null;
      }

      return session;
    } catch (error) {
      console.warn('Failed to retrieve session from localStorage:', error);
      localStorage.removeItem('supabase_session');
      return null;
    }
  }

  /**
   * Clears stored session data from localStorage.
   */
  static clearStoredSession(): void {
    try {
      localStorage.removeItem('supabase_session');
    } catch (error) {
      console.warn('Failed to clear session from localStorage:', error);
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
      
      return (error as { message: string }).message;
    }
    
    return 'An unexpected error occurred. Please try again.';
  }
}

export default SupabaseAuthService;