/**
 * Centralized error handling and logging service.
 * 
 * This module provides a standardized approach to error handling throughout the application.
 * It supports different log levels, structured error reporting, and can be easily extended
 * for external logging services in production.
 * 
 * @fileoverview Error handling and logging service
 */

/**
 * Log levels for different types of messages.
 */
export const LogLevel = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
} as const;

export type LogLevel = typeof LogLevel[keyof typeof LogLevel];

/**
 * Structured error information.
 */
export interface ErrorInfo {
  /** Error message */
  message: string;
  /** Error context or category */
  context?: string;
  /** Additional error details */
  details?: unknown;
  /** Stack trace */
  stack?: string;
  /** User ID (if available) */
  userId?: string;
  /** Timestamp */
  timestamp: string;
}

/**
 * Configuration for the error service.
 */
interface ErrorServiceConfig {
  /** Minimum log level to output */
  minLevel: LogLevel;
  /** Whether to log to console in development */
  enableConsoleLogging: boolean;
  /** External logging service endpoint */
  externalLogEndpoint?: string;
}

/**
 * Default configuration for the error service.
 */
const DEFAULT_CONFIG: ErrorServiceConfig = {
  minLevel: process.env.NODE_ENV === 'development' ? LogLevel.DEBUG : LogLevel.WARN,
  enableConsoleLogging: process.env.NODE_ENV === 'development',
};

/**
 * Centralized error handling service.
 */
class ErrorService {
  private config: ErrorServiceConfig;

  constructor(config: Partial<ErrorServiceConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Logs debug information.
   */
  debug(message: string, context?: string, details?: unknown): void {
    this.log(LogLevel.DEBUG, message, context, details);
  }

  /**
   * Logs informational messages.
   */
  info(message: string, context?: string, details?: unknown): void {
    this.log(LogLevel.INFO, message, context, details);
  }

  /**
   * Logs warning messages.
   */
  warn(message: string, context?: string, details?: unknown): void {
    this.log(LogLevel.WARN, message, context, details);
  }

  /**
   * Logs error messages.
   */
  error(message: string, context?: string, details?: unknown): void {
    this.log(LogLevel.ERROR, message, context, details);
  }

  /**
   * Logs error objects with full context.
   */
  logError(error: Error, context?: string, additionalDetails?: unknown): void {
    const errorInfo: ErrorInfo = {
      message: error.message,
      context,
      details: additionalDetails,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    };

    this.log(LogLevel.ERROR, error.message, context, errorInfo);
  }

  /**
   * Internal logging method.
   */
  private log(level: LogLevel, message: string, context?: string, details?: unknown): void {
    // Check if we should log this level
    if (!this.shouldLog(level)) {
      return;
    }

    const logEntry: ErrorInfo = {
      message,
      context,
      details,
      timestamp: new Date().toISOString(),
    };

    // Console logging for development
    if (this.config.enableConsoleLogging) {
      this.logToConsole(level, logEntry);
    }

    // External logging (could be implemented for production)
    this.logToExternal(level, logEntry);
  }

  /**
   * Determines if a log level should be output.
   */
  private shouldLog(level: LogLevel): boolean {
    const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
    const currentLevelIndex = levels.indexOf(this.config.minLevel);
    const messageLevelIndex = levels.indexOf(level);
    
    return messageLevelIndex >= currentLevelIndex;
  }

  /**
   * Logs to console with appropriate styling.
   */
  private logToConsole(level: LogLevel, logEntry: ErrorInfo): void {
    const prefix = `[${level.toUpperCase()}]`;
    const contextStr = logEntry.context ? ` [${logEntry.context}]` : '';
    const message = `${prefix}${contextStr} ${logEntry.message}`;

    switch (level) {
      case LogLevel.DEBUG:
        console.debug(message, logEntry.details);
        break;
      case LogLevel.INFO:
        console.info(message, logEntry.details);
        break;
      case LogLevel.WARN:
        console.warn(message, logEntry.details);
        break;
      case LogLevel.ERROR:
        console.error(message, logEntry.details);
        if (logEntry.stack) {
          console.error('Stack trace:', logEntry.stack);
        }
        break;
    }
  }

  /**
   * Logs to external service (placeholder for future implementation).
   */
  private logToExternal(level: LogLevel, logEntry: ErrorInfo): void {
    // This would be implemented for production logging
    // Examples: Sentry, LogRocket, CloudWatch, etc.
    if (this.config.externalLogEndpoint && level === LogLevel.ERROR) {
      // Implementation would send logEntry to external service
      void logEntry; // Acknowledge the parameter is intentionally unused for now
    }
  }
}

// Create singleton instance
export const errorService = new ErrorService();

/**
 * Utility functions for common error scenarios.
 */
export const ErrorUtils = {
  /**
   * Handles async operation errors with consistent logging.
   */
  handleAsyncError: (
    operation: string,
    error: unknown,
    context?: string
  ): void => {
    const message = error instanceof Error ? error.message : 'Unknown error';
    errorService.error(`${operation} failed: ${message}`, context, error);
  },

  /**
   * Handles network/API errors with structured logging.
   */
  handleApiError: (
    endpoint: string,
    error: unknown,
    statusCode?: number
  ): void => {
    const context = `API:${endpoint}`;
    const details = { statusCode, error };
    errorService.error('API request failed', context, details);
  },

  /**
   * Handles validation errors.
   */
  handleValidationError: (
    field: string,
    value: unknown,
    validationRule: string
  ): void => {
    const context = 'Validation';
    const details = { field, value, validationRule };
    errorService.warn('Validation failed', context, details);
  },

  /**
   * Handles localStorage errors gracefully.
   */
  handleStorageError: (
    operation: 'read' | 'write' | 'remove',
    key: string,
    error: unknown
  ): void => {
    const context = 'Storage';
    const details = { operation, key, error };
    errorService.warn('Storage operation failed', context, details);
  },
} as const;