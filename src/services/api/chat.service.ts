/**
 * Chat service for handling chat operations and AI response simulation.
 * 
 * This service manages chat persistence, mock AI responses, and data operations
 * for the chat interface. It provides a clean API for chat functionality
 * with localStorage persistence and realistic AI response simulation.
 * 
 * @fileoverview Chat service with persistence and mock AI responses
 */

import { 
  type Chat, 
  type Message, 
  type AIResponse, 
  type ChatOptions,
  type MessageSender
} from '../../types/chat';
import { STORAGE_KEYS, CHAT_DEFAULTS } from '../../utils/constants';
import { ErrorUtils } from '../error';

/**
 * Mock AI responses for realistic chat simulation.
 */
const AI_RESPONSES = [
  "That's a great question! Let me help you with that.",
  "I understand what you're asking. Here's my perspective on that topic.",
  "Thanks for sharing that with me. I think there are a few ways to approach this.",
  "That's an interesting point you've raised. Let me break this down for you.",
  "I can definitely help you with that. Here's what I would suggest.",
  "Great question! This is actually something I encounter quite often.",
  "I appreciate you bringing this up. Let me provide some insights on this.",
  "That's a thoughtful question. I'll do my best to give you a comprehensive answer.",
  "I see what you're getting at. This is definitely worth exploring further.",
  "Thanks for the context. Based on what you've shared, here's my recommendation."
];

/**
 * ChatService class for managing chat operations.
 */
export class ChatService {
  private options: ChatOptions;

  /**
   * Initialize the chat service with configuration options.
   */
  constructor(options: Partial<ChatOptions> = {}) {
    this.options = {
      maxChats: options.maxChats ?? CHAT_DEFAULTS.MAX_CHATS,
      autoSave: options.autoSave ?? CHAT_DEFAULTS.AUTO_SAVE,
      responseDelay: options.responseDelay ?? CHAT_DEFAULTS.RESPONSE_DELAY
    };
  }

  /**
   * Generate a unique ID for messages and chats.
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generate a chat title from the first message.
   */
  private generateChatTitle(firstMessage: string): string {
    // Take first 50 characters and clean up
    const title = firstMessage.length > 50 
      ? `${firstMessage.substring(0, 50)}...` 
      : firstMessage;
    
    // Remove line breaks and extra spaces
    return title.replace(/\s+/g, ' ').trim();
  }

  /**
   * Load chats from localStorage.
   */
  loadChats(): Chat[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CHATS);
      if (!stored) return [];

      const chats = JSON.parse(stored) as Chat[];
      
      // Convert date strings back to Date objects
      return chats.map(chat => ({
        ...chat,
        createdAt: new Date(chat.createdAt),
        updatedAt: new Date(chat.updatedAt),
        messages: chat.messages.map(message => ({
          ...message,
          timestamp: new Date(message.timestamp)
        }))
      }));
    } catch (error) {
      ErrorUtils.handleStorageError('read', STORAGE_KEYS.CHATS, error);
      return [];
    }
  }

  /**
   * Save chats to localStorage.
   */
  saveChats(chats: Chat[]): void {
    if (!this.options.autoSave) return;

    try {
      // Limit the number of chats we keep
      const chatsToSave = chats
        .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
        .slice(0, this.options.maxChats);

      localStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(chatsToSave));
    } catch (error) {
      ErrorUtils.handleStorageError('write', STORAGE_KEYS.CHATS, error);
    }
  }

  /**
   * Load current chat ID from localStorage.
   */
  loadCurrentChatId(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEYS.CURRENT_CHAT_ID);
    } catch (error) {
      ErrorUtils.handleStorageError('read', STORAGE_KEYS.CURRENT_CHAT_ID, error);
      return null;
    }
  }

  /**
   * Save current chat ID to localStorage.
   */
  saveCurrentChatId(chatId: string | null): void {
    try {
      if (chatId) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_CHAT_ID, chatId);
      } else {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_CHAT_ID);
      }
    } catch (error) {
      ErrorUtils.handleStorageError('write', STORAGE_KEYS.CURRENT_CHAT_ID, error);
    }
  }

  /**
   * Create a new message.
   */
  createMessage(content: string, sender: MessageSender): Message {
    return {
      id: this.generateId(),
      content,
      sender,
      timestamp: new Date(),
      isLoading: false
    };
  }

  /**
   * Create a new chat with an initial message.
   */
  createChat(initialMessage: Message): Chat {
    return {
      id: this.generateId(),
      title: this.generateChatTitle(initialMessage.content),
      messages: [initialMessage],
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  /**
   * Add a message to an existing chat.
   */
  addMessageToChat(chat: Chat, message: Message): Chat {
    return {
      ...chat,
      messages: [...chat.messages, message],
      updatedAt: new Date()
    };
  }

  /**
   * Update a message in a chat (useful for loading states).
   */
  updateMessageInChat(chat: Chat, messageId: string, updates: Partial<Message>): Chat {
    return {
      ...chat,
      messages: chat.messages.map(msg => 
        msg.id === messageId ? { ...msg, ...updates } : msg
      ),
      updatedAt: new Date()
    };
  }

  /**
   * Generate a mock AI response.
   */
  async generateAIResponse(userMessage: string): Promise<AIResponse> {
    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, this.options.responseDelay));

    try {
      // Simple response selection based on message content
      let response: string;
      
      if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
        response = "Hello! How can I help you today?";
      } else if (userMessage.toLowerCase().includes('help')) {
        response = "I'm here to help! What specific question or topic would you like to discuss?";
      } else if (userMessage.toLowerCase().includes('thank')) {
        response = "You're very welcome! I'm glad I could help. Is there anything else you'd like to know?";
      } else {
        // Random response from our pool
        const randomIndex = Math.floor(Math.random() * AI_RESPONSES.length);
        response = AI_RESPONSES[randomIndex];
        
        // Add some variety by sometimes adding a follow-up
        if (Math.random() > 0.7) {
          response += " Is there anything specific about this you'd like me to elaborate on?";
        }
      }

      return {
        content: response,
        success: true
      };
    } catch (error) {
      return {
        content: "I'm sorry, I encountered an error generating a response. Please try again.",
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Delete a chat by ID.
   */
  deleteChat(chats: Chat[], chatId: string): Chat[] {
    return chats.filter(chat => chat.id !== chatId);
  }

  /**
   * Clear all chats.
   */
  clearAllChats(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.CHATS);
      localStorage.removeItem(STORAGE_KEYS.CURRENT_CHAT_ID);
    } catch (error) {
      ErrorUtils.handleStorageError('remove', 'chats', error);
    }
  }

  /**
   * Export chats as JSON for backup.
   */
  exportChats(chats: Chat[]): string {
    return JSON.stringify(chats, null, 2);
  }

  /**
   * Import chats from JSON.
   */
  importChats(jsonData: string): Chat[] {
    try {
      const imported = JSON.parse(jsonData) as Chat[];
      
      // Validate and convert dates
      return imported.map(chat => ({
        ...chat,
        createdAt: new Date(chat.createdAt),
        updatedAt: new Date(chat.updatedAt),
        messages: chat.messages.map(message => ({
          ...message,
          timestamp: new Date(message.timestamp)
        }))
      }));
    } catch {
      throw new Error('Invalid chat data format');
    }
  }
}

// Export a default instance
export const chatService = new ChatService();