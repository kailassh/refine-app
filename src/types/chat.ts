/**
 * Chat-related type definitions for the chat interface.
 * 
 * This file contains all TypeScript interfaces and types used throughout
 * the chat functionality, ensuring type safety and proper data structure
 * across components and state management.
 * 
 * @fileoverview Type definitions for chat functionality
 */

/**
 * Represents a single message in a chat conversation.
 */
export interface Message {
  /** Unique identifier for the message */
  id: string;
  /** Message content/text */
  content: string;
  /** Who sent the message - user or AI assistant */
  sender: MessageSender;
  /** When the message was created */
  timestamp: Date;
  /** Whether the message is currently being typed/generated */
  isLoading?: boolean;
}

/**
 * Who can send messages in the chat.
 */
export type MessageSender = 'user' | 'assistant';

/**
 * Represents a complete chat conversation.
 */
export interface Chat {
  /** Unique identifier for the chat */
  id: string;
  /** Display title for the chat (auto-generated from first message) */
  title: string;
  /** All messages in this chat conversation */
  messages: Message[];
  /** When the chat was created */
  createdAt: Date;
  /** When the chat was last updated */
  updatedAt: Date;
}

/**
 * Overall state for the chat interface.
 */
export interface ChatState {
  /** Currently active/selected chat */
  currentChat: Chat | null;
  /** List of all chat conversations */
  chats: Chat[];
  /** Whether a message is being sent or AI is responding */
  isLoading: boolean;
  /** Whether the sidebar is open (for mobile/responsive) */
  isSidebarOpen: boolean;
  /** Error message if any chat operation fails */
  error: string | null;
}

/**
 * Parameters for creating a new message.
 */
export interface CreateMessageParams {
  /** Message content */
  content: string;
  /** Who is sending the message */
  sender: MessageSender;
  /** Optional chat ID (if null, creates new chat) */
  chatId?: string | null;
}

/**
 * Response from AI service (mock implementation).
 */
export interface AIResponse {
  /** Generated response content */
  content: string;
  /** Whether the response generation was successful */
  success: boolean;
  /** Error message if generation failed */
  error?: string;
}

/**
 * Options for configuring chat behavior.
 */
export interface ChatOptions {
  /** Maximum number of chats to keep in history */
  maxChats?: number;
  /** Whether to auto-save chats to localStorage */
  autoSave?: boolean;
  /** Delay for AI response simulation (ms) */
  responseDelay?: number;
}

/**
 * Chat statistics for display/debugging.
 */
export interface ChatStats {
  /** Total number of chats */
  totalChats: number;
  /** Total number of messages across all chats */
  totalMessages: number;
  /** Most recent chat date */
  lastChatDate?: Date;
}

/**
 * Sidebar state and configuration.
 */
export interface SidebarState {
  /** Whether sidebar is currently open */
  isOpen: boolean;
  /** Whether sidebar should be collapsed by default on desktop */
  isCollapsed: boolean;
  /** Current screen size category */
  breakpoint: BreakpointSize;
}

/**
 * Screen size breakpoints for responsive behavior.
 */
export type BreakpointSize = 'mobile' | 'tablet' | 'desktop';

// Note: STORAGE_KEYS and CHAT_DEFAULTS have been moved to src/utils/constants/
// Import them from there: import { STORAGE_KEYS, CHAT_DEFAULTS } from '../utils/constants';