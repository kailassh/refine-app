/**
 * Message bubble component for displaying chat messages.
 * 
 * This component renders individual chat messages with appropriate styling
 * for user vs AI messages, loading states, and responsive design. It follows
 * Claude's chat interface patterns with proper alignment and visual hierarchy.
 * 
 * @fileoverview Message bubble component for chat messages
 */

import React from 'react';
import { type Message } from '../../../types/chat';
import { TypingIndicator } from '../LoadingIndicator/LoadingIndicator';
import { getRelativeTime } from '../../../utils/formatters';

/**
 * Props interface for the MessageBubble component.
 */
interface MessageBubbleProps {
  /** Message data to display */
  message: Message;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Message bubble component for individual chat messages.
 * 
 * Renders messages with different styling based on sender (user vs assistant),
 * handles loading states with typing indicators, and provides responsive
 * design with appropriate sizing and alignment.
 * 
 * @param props - Component props including message data
 * @returns JSX element representing a message bubble
 */
export const MessageBubble: React.FC<MessageBubbleProps> = React.memo(({
  message,
  className = ''
}) => {
  const isUser = message.sender === 'user';
  const isAssistant = message.sender === 'assistant';

  return (
    <div 
      className={`
        flex mb-6
        ${isUser ? 'justify-end' : 'justify-start'}
        ${className}
      `}
    >
      {/* Avatar for assistant messages */}
      {isAssistant && (
        <div className="flex-shrink-0 mr-3">
          <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
            <svg 
              className="w-4 h-4 text-gray-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-label="AI Assistant"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
              />
            </svg>
          </div>
        </div>
      )}

      {/* Message content */}
      <div className="flex flex-col max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl">
        {/* Message bubble */}
        <div
          className={`
            px-4 py-3 rounded-lg
            ${isUser 
              ? 'bg-gray-900 text-white rounded-br-sm' 
              : 'bg-gray-100 text-gray-900 rounded-bl-sm border border-gray-200'
            }
            ${message.isLoading ? 'min-h-12 flex items-center' : ''}
          `}
        >
          {message.isLoading ? (
            <TypingIndicator size="sm" />
          ) : (
            <div className="text-sm leading-relaxed whitespace-pre-wrap">
              {message.content}
            </div>
          )}
        </div>

        {/* Timestamp */}
        <div 
          className={`
            flex mt-1 text-xs text-gray-400
            ${isUser ? 'justify-end' : 'justify-start'}
          `}
        >
          <time dateTime={message.timestamp.toISOString()}>
            {getRelativeTime(message.timestamp)}
          </time>
        </div>
      </div>

      {/* Spacer for user messages (to maintain proper spacing) */}
      {isUser && <div className="flex-shrink-0 w-11" />}
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function for React.memo
  return (
    prevProps.message.id === nextProps.message.id &&
    prevProps.message.content === nextProps.message.content &&
    prevProps.message.isLoading === nextProps.message.isLoading &&
    prevProps.className === nextProps.className
  );
});

export default MessageBubble;