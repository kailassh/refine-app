/**
 * Loading indicator components using Material-UI components.
 * 
 * This file provides various loading indicators used throughout the chat
 * interface including typing indicators and skeleton loaders with modern MUI styling.
 * 
 * @fileoverview Loading indicators with MUI components
 */

import React from 'react';
import { Box, CircularProgress, Skeleton } from '@mui/material';

/**
 * Props interface for LoadingIndicator components.
 */
interface LoadingIndicatorProps {
  /** Size variant for the indicator */
  size?: 'small' | 'medium' | 'large';
  /** Custom styling */
  sx?: object;
}

/**
 * Typing indicator for AI responses - shows animated dots.
 * 
 * Displays three animated dots to indicate the AI is "thinking" or
 * generating a response. Uses MUI keyframe animations for smooth pulsing effect.
 */
export const TypingIndicator: React.FC<LoadingIndicatorProps> = ({
  size = 'medium',
  sx = {}
}) => {
  const getDotSize = () => {
    switch (size) {
      case 'small': return 8;
      case 'large': return 16;
      default: return 12;
    }
  };

  const dotSize = getDotSize();
  const spacing = size === 'small' ? 1 : size === 'large' ? 3 : 2;

  return (
    <Box 
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: spacing,
        ...sx
      }}
      aria-label="AI is typing"
    >
      {[0, 200, 400].map((delay, index) => (
        <Box
          key={index}
          sx={{
            width: dotSize,
            height: dotSize,
            borderRadius: '50%',
            backgroundColor: 'text.secondary',
            animation: 'pulse 1.4s ease-in-out infinite',
            animationDelay: `${delay}ms`,
            '@keyframes pulse': {
              '0%, 80%, 100%': {
                opacity: 0.3,
                transform: 'scale(1)',
              },
              '40%': {
                opacity: 1,
                transform: 'scale(1.1)',
              },
            },
          }}
        />
      ))}
    </Box>
  );
};

/**
 * Generic spinning loader for general loading states.
 * 
 * A circular progress indicator that rotates continuously. Used for
 * operations like sending messages or loading chat history.
 */
export const SpinningLoader: React.FC<LoadingIndicatorProps> = ({
  size = 'medium',
  sx = {}
}) => {
  const getSize = () => {
    switch (size) {
      case 'small': return 20;
      case 'large': return 40;
      default: return 30;
    }
  };

  return (
    <CircularProgress
      size={getSize()}
      sx={{
        color: 'text.secondary',
        ...sx
      }}
      aria-label="Loading"
    />
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
  /** Custom styling */
  sx?: object;
}> = ({ 
  isUser = false, 
  sx = {}
}) => {
  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb: 2,
        ...sx
      }}
    >
      <Box 
        sx={{
          maxWidth: { xs: '75%', sm: '60%', md: '50%' },
          p: 2,
          borderRadius: 2,
          borderBottomRightRadius: isUser ? 0.5 : 2,
          borderBottomLeftRadius: isUser ? 2 : 0.5,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Skeleton variant="text" sx={{ width: '75%', height: 20 }} />
          <Skeleton variant="text" sx={{ width: '50%', height: 20 }} />
        </Box>
      </Box>
    </Box>
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
  /** Custom styling */
  sx?: object;
}> = ({ 
  message = "Loading chat...", 
  sx = {}
}) => {
  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 256,
        gap: 2,
        ...sx
      }}
    >
      <SpinningLoader size="large" />
      <Box 
        component="p" 
        sx={{ 
          color: 'text.secondary', 
          fontSize: '0.875rem',
          margin: 0
        }}
      >
        {message}
      </Box>
    </Box>
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
  /** Custom styling */
  sx?: object;
}> = ({ 
  count = 3, 
  sx = {}
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, ...sx }}>
      {Array.from({ length: count }).map((_, index) => (
        <Box key={index} sx={{ p: 2, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Skeleton variant="text" sx={{ width: '75%', height: 20 }} />
            <Skeleton variant="text" sx={{ width: '50%', height: 16 }} />
          </Box>
        </Box>
      ))}
    </Box>
  );
};