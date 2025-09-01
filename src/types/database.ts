/**
 * Database type definitions for Supabase.
 * 
 * This file contains TypeScript type definitions for the Supabase database schema.
 * These types are used to ensure type safety when interacting with the database.
 * 
 * @fileoverview Supabase database type definitions
 */

/**
 * Main database interface.
 * 
 * This interface represents the structure of the Supabase database,
 * organized by schema. Currently using a minimal structure focused
 * on authentication, but can be extended as the application grows.
 */
export interface Database {
  public: {
    Tables: Record<string, never>;
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

/**
 * Helper type for extracting table row types.
 */
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T] extends { Row: infer R } ? R : never;

/**
 * Helper type for extracting table insert types.
 */
export type TablesInsert<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T] extends { Insert: infer I } ? I : never;

/**
 * Helper type for extracting table update types.
 */
export type TablesUpdate<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T] extends { Update: infer U } ? U : never;