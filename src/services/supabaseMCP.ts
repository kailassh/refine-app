/**
 * Supabase MCP service layer for direct MCP integration.
 * 
 * This service provides a wrapper for calling Supabase MCP functions
 * directly within the React application context.
 * 
 * @fileoverview Supabase MCP integration service
 */

import { 
  type SupabaseSignInWithOtpResponse,
  type SupabaseVerifyOtpResponse,
  type SupabaseMCPResult,
  type SupabaseSignInOptions,
  type SupabaseOtpType
} from '../types/auth';
import SupabaseAuthService from './supabase';

/**
 * Supabase MCP service class for direct MCP function calls.
 */
export class SupabaseMCPService {
  /**
   * Sends an OTP code to the specified email address using Supabase MCP.
   */
  static async sendOTPToEmail(
    email: string, 
    options: SupabaseSignInOptions = {}
  ): Promise<SupabaseMCPResult<SupabaseSignInWithOtpResponse>> {
    try {
      // For Claude Code MCP integration, we would call the actual Supabase function here
      // Since we're in a browser context, we'll use fetch to call a backend endpoint
      // that has access to the MCP functions
      
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          options: {
            shouldCreateUser: true,
            ...options
          }
        })
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          error: {
            message: result.message || 'Failed to send OTP',
            code: result.code || 'SEND_OTP_ERROR'
          }
        };
      }

      return {
        data: result.data
      };
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
   * Verifies the OTP code using Supabase MCP.
   */
  static async verifyOTPCode(
    email: string,
    token: string,
    type: SupabaseOtpType = 'email'
  ): Promise<SupabaseMCPResult<SupabaseVerifyOtpResponse>> {
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          token,
          type
        })
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          error: {
            message: result.message || 'Failed to verify OTP',
            code: result.code || 'VERIFY_OTP_ERROR'
          }
        };
      }

      return {
        data: result.data
      };
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
   * Signs out the current user using Supabase MCP.
   */
  static async signOut(): Promise<SupabaseMCPResult<void>> {
    try {
      const response = await fetch('/api/auth/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const result = await response.json();
        return {
          error: {
            message: result.message || 'Failed to sign out',
            code: result.code || 'SIGN_OUT_ERROR'
          }
        };
      }

      // Clear local session
      SupabaseAuthService.clearStoredSession();

      return { data: undefined };
    } catch (error) {
      return {
        error: {
          message: error instanceof Error ? error.message : 'Failed to sign out',
          code: 'SIGN_OUT_ERROR'
        }
      };
    }
  }
}

export default SupabaseMCPService;