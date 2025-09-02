/**
 * Message formatting utilities.
 * 
 * This module provides functions for formatting and processing chat messages.
 */

/**
 * Truncate text to a specified length with ellipsis.
 * 
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

/**
 * Get preview text from a message for display in chat list.
 * 
 * @param content - Full message content
 * @param maxLength - Maximum preview length
 * @returns Preview text
 */
export const getMessagePreview = (content: string, maxLength: number = 40): string => {
  // Remove extra whitespace and newlines
  const cleanContent = content.replace(/\s+/g, ' ').trim();
  
  if (!cleanContent) return 'No content';
  
  return truncateText(cleanContent, maxLength);
};

/**
 * Generate a title for a chat based on its first message.
 * 
 * @param firstMessage - First message in the chat
 * @param maxLength - Maximum title length
 * @returns Generated chat title
 */
export const generateChatTitle = (firstMessage: string, maxLength: number = 50): string => {
  if (!firstMessage.trim()) return 'New conversation';
  
  // Extract first sentence or first line
  const firstSentence = firstMessage.split(/[.!?]/)[0].trim();
  const firstLine = firstMessage.split('\n')[0].trim();
  
  // Use whichever is shorter
  const title = firstSentence.length <= firstLine.length ? firstSentence : firstLine;
  
  return truncateText(title || firstMessage, maxLength);
};

/**
 * Count words in a text string.
 * 
 * @param text - Text to count words in
 * @returns Number of words
 */
export const countWords = (text: string): number => {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

/**
 * Estimate reading time for text (based on 200 words per minute).
 * 
 * @param text - Text to estimate reading time for
 * @returns Reading time in minutes (rounded up)
 */
export const estimateReadingTime = (text: string): number => {
  const wordCount = countWords(text);
  const wordsPerMinute = 200;
  return Math.ceil(wordCount / wordsPerMinute);
};

/**
 * Format message content for display (basic markdown-like formatting).
 * 
 * @param content - Raw message content
 * @returns Formatted message content
 */
export const formatMessageContent = (content: string): string => {
  return content
    .replace(/\n/g, '<br />') // Convert newlines to HTML breaks
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text
    .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic text
    .replace(/`(.*?)`/g, '<code>$1</code>'); // Inline code
};