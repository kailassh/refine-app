/**
 * Custom hook for Supabase MCP authentication integration.
 * 
 * This hook provides methods to interact with Supabase authentication
 * using the MCP functions available in the Claude Code environment.
 * It handles OTP sending, verification, and session management.
 * 
 * @fileoverview Supabase MCP authentication hook
 */

import { useCallback } from 'react';
import {
  type SupabaseSession,
  type User
} from '../../types/auth';
import SupabaseAuthService from '../../services/supabase/supabase';

/**
 * Hook for Supabase MCP authentication operations.
 */
export const useSupabaseAuth = () => {
  /**
   * Sends OTP to user's email using Supabase MCP.
   * 
   * @param email - User's email address
   * @returns Promise with success/error result
   */
  const sendOTPToEmail = useCallback(async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const result = await SupabaseAuthService.sendOTPToEmail(email);

      if (result.error) {
        return {
          success: false,
          error: result.error.message
        };
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: SupabaseAuthService.formatErrorMessage(error)
      };
    }
  }, []);

  /**
   * Verifies OTP code using Supabase MCP.
   * 
   * @param email - User's email address
   * @param token - 6-digit OTP code
   * @returns Promise with verification result, user data, and session
   */
  const verifyOTPCode = useCallback(async (
    email: string,
    token: string
  ): Promise<{ success: boolean; user?: User; session?: SupabaseSession; error?: string }> => {
    try {
      const result = await SupabaseAuthService.verifyOTPCode(email, token);

      if (result.error) {
        return {
          success: false,
          error: result.error.message
        };
      }

      if (!result.data?.user) {
        return {
          success: false,
          error: 'No user data received from verification'
        };
      }

      // Transform to our User type
      const userData = SupabaseAuthService.transformSupabaseUser(result.data.user);

      return {
        success: true,
        user: userData,
        session: result.data.session || undefined
      };
    } catch (error) {
      return {
        success: false,
        error: SupabaseAuthService.formatErrorMessage(error)
      };
    }
  }, []);

  /**
   * Signs out the current user using Supabase MCP.
   * 
   * @returns Promise with success/error result
   */
  const signOut = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    try {
      const result = await SupabaseAuthService.signOut();

      if (result.error) {
        return {
          success: false,
          error: result.error.message
        };
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: SupabaseAuthService.formatErrorMessage(error)
      };
    }
  }, []);

  return {
    sendOTPToEmail,
    verifyOTPCode,
    signOut
  };
};