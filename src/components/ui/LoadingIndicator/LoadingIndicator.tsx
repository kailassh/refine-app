/**
 * Loading indicator components for chat interface.
 * 
 * This file provides various loading indicators used throughout the chat
 * interface including typing indicators for AI responses and generic
 * loading spinners for various operations.
 * 
 * @fileoverview Loading indicators for chat interface
 */

import React from 'react';

/**
 * Props interface for LoadingIndicator components.
 */
interface LoadingIndicatorProps {
  /** Additional CSS classes */
  className?: string;
  /** Size variant for the indicator */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Typing indicator for AI responses - shows animated dots.
 * 
 * Displays three animated dots to indicate the AI is "thinking" or
 * generating a response. Uses CSS animations for smooth pulsing effect.
 */
export const TypingIndicator: React.FC<LoadingIndicatorProps> = ({
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'space-x-1',
    md: 'space-x-2', 
    lg: 'space-x-3'
  };

  const dotSizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  return (
    <div 
      className={`flex items-center ${sizeClasses[size]} ${className}`}
      aria-label="AI is typing"
    >
      <div 
        className={`${dotSizeClasses[size]} bg-gray-400 rounded-full animate-pulse`}
        style={{
          animationDelay: '0ms',
          animationDuration: '1.4s'
        }}
      />
      <div 
        className={`${dotSizeClasses[size]} bg-gray-400 rounded-full animate-pulse`}
        style={{
          animationDelay: '200ms',
          animationDuration: '1.4s'
        }}
      />
      <div 
        className={`${dotSizeClasses[size]} bg-gray-400 rounded-full animate-pulse`}
        style={{
          animationDelay: '400ms',
          animationDuration: '1.4s'
        }}
      />
    </div>
  );
};

/**
 * Generic spinning loader for general loading states.
 * 
 * A circular SVG spinner that rotates continuously. Used for
 * operations like sending messages or loading chat history.
 */
export const SpinningLoader: React.FC<LoadingIndicatorProps> = ({
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <svg
      className={`${sizeClasses[size]} animate-spin text-gray-400 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-label="Loading"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

/**
 * Pulsing skeleton loader for message placeholders.
 * 
 * Shows a pulsing gray box that matches message bubble dimensions
 * while messages are being loaded or sent.
 */
export const MessageSkeleton: React.FC<{
  /** Whether this is a user message (affects alignment) */
  isUser?: boolean;
  /** Additional CSS classes */
  className?: string;
}> = ({ 
  isUser = false, 
  className = '' 
}) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 ${className}`}>
      <div 
        className={`
          max-w-xs lg:max-w-md xl:max-w-lg
          px-4 py-3 rounded-lg
          bg-gray-200 animate-pulse
          ${isUser ? 'rounded-br-sm' : 'rounded-bl-sm'}
        `}
      >
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

/**
 * Loading state for the entire chat interface.
 * 
 * Shows a centered loading spinner with optional text message
 * for full-screen loading states.
 */
export const ChatLoadingState: React.FC<{
  /** Loading message to display */
  message?: string;
  /** Additional CSS classes */
  className?: string;
}> = ({ 
  message = "Loading chat...", 
  className = '' 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center h-64 space-y-4 ${className}`}>
      <SpinningLoader size="lg" />
      <p className="text-gray-500 text-sm">{message}</p>
    </div>
  );
};

/**
 * Loading indicator for sidebar chat list.
 * 
 * Shows skeleton placeholders for chat list items while
 * chat history is being loaded.
 */
export const ChatListSkeleton: React.FC<{
  /** Number of skeleton items to show */
  count?: number;
  /** Additional CSS classes */
  className?: string;
}> = ({ 
  count = 3, 
  className = '' 
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="p-3 rounded-lg bg-gray-100 animate-pulse">
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4" />
            <div className="h-3 bg-gray-300 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};