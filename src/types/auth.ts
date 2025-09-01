/**
 * Form data structure for email-based login.
 * 
 * Contains the data collected from the login form before submission.
 * This interface ensures type safety for form handling and validation.
 */
export interface LoginFormData {
  /** User's email address for authentication */
  email: string;
}

/**
 * Form data structure for OTP verification.
 * 
 * Contains the OTP code entered by the user for verification.
 */
export interface OTPFormData {
  /** 6-digit OTP code for verification */
  otp: string;
}

/**
 * Authentication state interface representing the current auth status.
 * 
 * This interface tracks all aspects of the authentication state including
 * loading states, error messages, and authentication status. Used throughout
 * the application to determine UI state and user permissions.
 */
export interface AuthState {
  /** Whether an authentication operation is currently in progress */
  isLoading: boolean;
  /** Error message from failed authentication attempts, null if no error */
  error: string | null;
  /** Whether the user is currently authenticated */
  isAuthenticated: boolean;
  /** Current step in the authentication flow */
  authStep: AuthStep;
  /** User data if authenticated */
  user: User | null;
  /** Email that was used for OTP verification */
  pendingEmail: string | null;
  /** Timer state for OTP countdown */
  otpTimer: OTPTimerState;
}

/**
 * Authentication steps in the login flow.
 */
export type AuthStep = 
  /** User needs to enter email address */
  | 'email_input'
  /** User needs to verify OTP sent to email */
  | 'otp_verification'
  /** User is authenticated and can access the app */
  | 'authenticated';

/**
 * OTP timer state for countdown functionality.
 */
export interface OTPTimerState {
  /** Time remaining in seconds for OTP validity */
  timeRemaining: number;
  /** Whether the timer is currently active */
  isActive: boolean;
  /** Whether user can request a new OTP */
  canResend: boolean;
}

/**
 * Form validation errors for authentication forms.
 * 
 * Contains field-specific error messages for form validation.
 * All fields are optional since not all fields may have errors at once.
 */
export interface ValidationErrors {
  /** Validation error for email field, undefined if valid */
  email?: string;
  /** Validation error for OTP field, undefined if valid */
  otp?: string;
}

/**
 * Type definition for authentication context.
 * 
 * Defines the shape of the authentication context that would be provided
 * by a React Context. Currently not used but available for future context
 * implementation to share auth state across components.
 */
export interface AuthContextType {
  /** Current authentication state */
  authState: AuthState;
  /** Function to authenticate user with email */
  loginWithEmail: (email: string) => Promise<void>;
  /** Function to verify OTP code */
  verifyOTP: (otp: string) => Promise<void>;
  /** Function to resend OTP to email */
  resendOTP: () => Promise<void>;
  /** Function to log out the current user */
  logout: () => void;
  /** Function to go back to email input step */
  goBackToEmail: () => void;
}

/**
 * Union type for supported authentication providers.
 * 
 * Currently only supports email authentication, but can be extended
 * to include other providers like 'google', 'github', 'oauth', etc.
 */
export type AuthProvider = 'email';

/**
 * Supabase OTP verification type.
 */
export type SupabaseOtpType = 'email' | 'sms' | 'phone_change' | 'email_change';

/**
 * User profile information interface.
 * 
 * Represents the structure of user data once authenticated.
 * Contains core user information that the application needs.
 */
export interface User {
  /** Unique identifier for the user */
  id: string;
  /** User's email address */
  email: string;
  /** Whether the user's email is confirmed */
  emailConfirmed: boolean;
  /** Timestamp when the user was created */
  createdAt: string;
  /** Timestamp when the user last signed in */
  lastSignInAt?: string;
  /** Optional display name for the user */
  name?: string;
  /** Optional URL to user's avatar image */
  avatar?: string;
}

/**
 * Supabase authentication error interface.
 * 
 * Represents error responses from Supabase authentication operations.
 */
export interface SupabaseAuthError {
  /** Error message */
  message: string;
  /** Error code from Supabase */
  code?: string;
  /** HTTP status code */
  status?: number;
}

/**
 * Common authentication error codes used in the application.
 */
export type AuthErrorCode = 
  | 'SEND_OTP_ERROR'
  | 'RATE_LIMIT_ERROR'
  | 'VERIFY_OTP_ERROR'
  | 'TOKEN_EXPIRED'
  | 'INVALID_TOKEN'
  | 'SIGN_OUT_ERROR'
  | 'USER_CREATION_ERROR'
  | 'USER_NOT_FOUND'
  | 'EMAIL_NOT_CONFIRMED'
  | 'INVALID_CREDENTIALS'
  | 'SIGNUPS_DISABLED';

/**
 * Supabase user object from authentication responses.
 * 
 * Represents the user object returned by Supabase auth operations.
 */
export interface SupabaseUser {
  /** Unique identifier for the user */
  id: string;
  /** User's email address */
  email: string;
  /** Timestamp when email was confirmed */
  email_confirmed_at?: string;
  /** Timestamp when the user was created */
  created_at: string;
  /** Timestamp when the user last signed in */
  last_sign_in_at?: string;
  /** Additional metadata about the user */
  user_metadata?: Record<string, unknown>;
  /** App-specific metadata */
  app_metadata?: Record<string, unknown>;
  /** User's phone number if provided */
  phone?: string;
}

/**
 * Supabase session object from authentication responses.
 * 
 * Represents the session object returned by Supabase auth operations.
 */
export interface SupabaseSession {
  /** JWT access token */
  access_token: string;
  /** Token type (usually 'bearer') */
  token_type: string;
  /** Token expiration time in seconds */
  expires_in: number;
  /** Refresh token for renewing the session */
  refresh_token: string;
  /** User object associated with this session */
  user: SupabaseUser;
}

/**
 * Supabase signInWithOtp response interface.
 * 
 * Response from the signInWithOtp MCP call.
 */
export interface SupabaseSignInWithOtpResponse {
  /** User data (null when sending OTP) */
  user: SupabaseUser | null;
  /** Session data (null when sending OTP) */
  session: SupabaseSession | null;
}

/**
 * Supabase verifyOtp response interface.
 * 
 * Response from the verifyOtp MCP call.
 */
export interface SupabaseVerifyOtpResponse {
  /** User data after successful verification */
  user: SupabaseUser | null;
  /** Session data after successful verification */
  session: SupabaseSession | null;
}

/**
 * Supabase MCP operation result.
 * 
 * Generic wrapper for Supabase MCP responses with error handling.
 */
export interface SupabaseMCPResult<T> {
  /** Success data */
  data?: T;
  /** Error information if operation failed */
  error?: SupabaseAuthError;
}

/**
 * Options for Supabase signInWithOtp operation.
 */
export interface SupabaseSignInOptions {
  /** Whether to create a new user if they don't exist */
  shouldCreateUser?: boolean;
  /** Email redirect URL after successful authentication */
  emailRedirectTo?: string;
}