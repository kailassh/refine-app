/**
 * Chat input component with auto-resize functionality.
 * 
 * This component provides a text input for sending chat messages with
 * auto-resizing based on content, send button integration, and proper
 * keyboard handling. It includes loading states and accessibility features.
 * 
 * @fileoverview Auto-resizing chat input component
 */

import React, { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { SpinningLoader } from '../../../ui/LoadingIndicator';

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
  /** Additional CSS classes */
  className?: string;
}

/**
 * Auto-resizing chat input component.
 * 
 * Provides a textarea that expands with content, send button, and proper
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
  className = ''
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = 'auto';
    
    // Calculate new height (min 1 line, max 6 lines)
    const lineHeight = 22; // Approximate line height in pixels
    const minHeight = 40; // Single line minimum height with padding
    const maxHeight = lineHeight * 6 + 16; // 6 lines maximum + padding
    
    const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
    textarea.style.height = `${newHeight}px`;
  }, [message]);

  /**
   * Handle form submission or Enter key press.
   */
  const handleSend = () => {
    if (!message.trim() || isLoading || disabled) return;
    
    onSendMessage(message.trim());
    setMessage('');
  };

  /**
   * Handle keyboard events in the textarea.
   */
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
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
  const canSend = message.trim().length > 0 && !isDisabled;

  return (
    <div className={`border-t bg-white border-gray-200 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-start space-x-3">
          {/* Text input area */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={isDisabled}
              rows={1}
              className={`
                w-full resize-none
                px-4 py-2
                text-base border rounded-lg border-gray-300
                transition-colors duration-200
                hover:border-gray-400
                focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent
                disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50
                ${message.length > 0 ? 'border-gray-400' : ''}
              `}
              style={{
                minHeight: '40px',
                maxHeight: '148px',
                lineHeight: '22px'
              }}
              aria-label="Chat message input"
            />
            
            {/* Character counter for very long messages */}
            {message.length > 500 && (
              <div className="absolute bottom-1 right-2 text-xs text-gray-400">
                {message.length}/2000
              </div>
            )}
          </div>

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={!canSend}
            className={`
              flex items-center justify-center flex-shrink-0
              w-10 h-10 rounded-lg
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
              ${canSend
                ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-sm'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }
            `}
            aria-label={isLoading ? 'Sending message' : 'Send message'}
            title={isLoading ? 'Sending...' : 'Send message (Enter)'}
          >
            {isLoading ? (
              <SpinningLoader size="sm" className="text-current" />
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Help text */}
        <div className="mt-2 text-xs text-gray-500">
          <span>Press Enter to send, Shift+Enter for new line</span>
          {message.length > 1500 && (
            <span className="ml-2 text-orange-500">
              • Message is getting long
            </span>
          )}
          {message.length > 1900 && (
            <span className="ml-2 text-red-500">
              • Approaching character limit
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInput;