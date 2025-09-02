/**
 * Supabase client configuration and initialization.
 * 
 * This module sets up the Supabase client instance with proper configuration
 * for authentication, using environment variables for connection details.
 * 
 * @fileoverview Supabase client configuration
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../../types/database';

// Environment variables for Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Validates that required environment variables are present.
 * 
 * @throws Error if required environment variables are missing
 */
const validateEnvironmentVariables = () => {
  if (!supabaseUrl) {
    throw new Error(
      'Missing VITE_SUPABASE_PROJECT_URL environment variable. Please check your .env file.'
    );
  }

  if (!supabaseAnonKey) {
    throw new Error(
      'Missing VITE_SUPABASE_ANON_KEY environment variable. Please check your .env file.'
    );
  }

  // Validate URL format
  try {
    new URL(supabaseUrl);
  } catch {
    throw new Error(
      'Invalid VITE_SUPABASE_PROJECT_URL format. Please ensure it\'s a valid URL.'
    );
  }
};

// Validate environment variables on module load
validateEnvironmentVariables();

/**
 * Supabase client instance configured for authentication.
 * 
 * This client is configured with:
 * - Session persistence in localStorage
 * - Automatic session refresh
 * - Proper authentication flow handling
 */
export const supabase: SupabaseClient<Database> = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      // Store session in localStorage for persistence across page refreshes
      storage: window.localStorage,
      // Automatically refresh expired sessions
      autoRefreshToken: true,
      // Persist session across browser sessions
      persistSession: true,
      // Detect session from URL on page load (useful for magic links)
      detectSessionInUrl: true,
    },
  }
);

/**
 * Gets the current authentication session.
 * 
 * @returns Promise resolving to current session or null
 */
export const getCurrentSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) {
    console.error('Error getting session:', error);
    return null;
  }

  return session;
};

/**
 * Gets the current authenticated user.
 * 
 * @returns Promise resolving to current user or null
 */
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Error getting user:', error);
    return null;
  }

  return user;
};

export default supabase;