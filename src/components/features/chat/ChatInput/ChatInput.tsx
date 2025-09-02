/**
 * Chat input component with Material-UI TextField and auto-resize functionality.
 * 
 * This component provides a text input using MUI TextField for sending chat
 * messages with auto-resizing, modern theming, and proper keyboard handling.
 * 
 * @fileoverview Auto-resizing chat input component using MUI
 */

import React, { useState, type KeyboardEvent } from 'react';
import { 
  Box, 
  TextField, 
  Typography, 
  Stack
} from '@mui/material';

/**
 * Props interface for the ChatInput component.
 */
interface ChatInputProps {
  /** Callback when user sends a message */
  onSendMessage: (message: string) => void;
  /** Whether a message is currently being sent/processed */
  isLoading?: boolean;
  /** Placeholder text for the input */
  placeholder?: string;
  /** Whether the input should be disabled */
  disabled?: boolean;
  /** Custom styling */
  sx?: object;
}

/**
 * Auto-resizing chat input component.
 * 
 * Provides a TextField that expands with content, send button, and proper
 * keyboard shortcuts (Enter to send, Shift+Enter for new line). Includes
 * loading states and accessibility features.
 * 
 * @param props - Component props including callbacks and state
 * @returns JSX element representing the chat input interface
 */
export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading = false,
  placeholder = "Type your message...",
  disabled = false,
  sx = {}
}) => {
  const [message, setMessage] = useState('');

  /**
   * Handle form submission or Enter key press.
   */
  const handleSend = () => {
    if (!message.trim() || isLoading || disabled) return;
    
    onSendMessage(message.trim());
    setMessage('');
  };

  /**
   * Handle keyboard events in the TextField.
   */
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    // Send message on Enter (without Shift)
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
      return;
    }
    
    // Allow Shift+Enter for new line (default behavior)
    if (event.key === 'Enter' && event.shiftKey) {
      return; // Let default behavior handle the new line
    }
  };

  /**
   * Handle input change and update message state.
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const isDisabled = disabled || isLoading;

  return (
    <Box 
      sx={{ 
        borderTop: 1, 
        borderColor: 'divider', 
        bgcolor: 'background.default',
        ...sx 
      }}
    >
      <Box 
        sx={{ 
          maxWidth: 1024, 
          mx: 'auto', 
          px: 2, 
          py: 2 
        }}
      >
        <Stack spacing={1}>
          {/* Text input area */}
          <Box sx={{ position: 'relative' }}>
            <TextField
              multiline
              minRows={1}
              maxRows={6}
              value={message}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={isDisabled}
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
                '& .MuiInputBase-input': {
                  lineHeight: 1.4,
                },
              }}
              aria-label="Chat message input"
            />
            
            {/* Character counter for very long messages */}
            {message.length > 500 && (
              <Typography 
                variant="caption" 
                sx={{ 
                  position: 'absolute', 
                  bottom: 6, 
                  right: 8, 
                  color: 'text.secondary',
                  fontSize: '0.75rem'
                }}
              >
                {message.length}/2000
              </Typography>
            )}
          </Box>

          {/* Help text */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Press Enter to send, Shift+Enter for new line
            </Typography>
            {message.length > 1500 && (
              <Typography 
                variant="caption" 
                sx={{ color: 'warning.main' }}
              >
                • Message is getting long
              </Typography>
            )}
            {message.length > 1900 && (
              <Typography 
                variant="caption" 
                sx={{ color: 'error.main' }}
              >
                • Approaching character limit
              </Typography>
            )}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default ChatInput;