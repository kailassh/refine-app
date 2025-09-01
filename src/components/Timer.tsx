/**
 * Timer component for displaying countdown and progress visualization.
 * 
 * This component renders a countdown timer with visual progress indicator
 * for OTP expiration. It formats time display and shows remaining time
 * as both text and a visual progress bar.
 * 
 * @fileoverview Timer component with countdown and progress visualization
 */

import React from 'react';

/**
 * Props interface for the Timer component.
 */
interface TimerProps {
  /** Time remaining in seconds */
  timeRemaining: number;
  /** Whether the timer is currently active */
  isActive: boolean;
  /** Total duration for calculating progress (default: 120 seconds) */
  totalDuration?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Formats seconds into MM:SS format.
 * 
 * @param seconds - Time in seconds to format
 * @returns Formatted time string (e.g., "02:30")
 */
const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * Timer functional component.
 * 
 * Displays a countdown timer with visual progress indicator. Shows remaining
 * time in MM:SS format and renders a progress bar showing how much time has
 * elapsed. Changes color based on remaining time (green -> yellow -> red).
 * 
 * @param props - Component props including time data and styling
 * @returns JSX element representing the timer
 */
export const Timer: React.FC<TimerProps> = ({
  timeRemaining,
  isActive,
  totalDuration = 120,
  className = ''
}) => {
  // Calculate progress percentage (0-100)
  const progressPercentage = Math.max(0, ((totalDuration - timeRemaining) / totalDuration) * 100);
  
  // Determine color based on remaining time
  const getTimerColor = (): string => {
    const timePercent = (timeRemaining / totalDuration) * 100;
    if (timePercent > 50) return 'text-green-600';
    if (timePercent > 25) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  // Determine progress bar color
  const getProgressColor = (): string => {
    const timePercent = (timeRemaining / totalDuration) * 100;
    if (timePercent > 50) return 'bg-green-500';
    if (timePercent > 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (!isActive) {
    return null;
  }

  return (
    <div className={`flex flex-col items-center space-y-3 ${className}`}>
      {/* Time Display */}
      <div className={`text-lg font-medium ${getTimerColor()}`}>
        {formatTime(timeRemaining)}
      </div>
      
      {/* Progress Bar */}
      <div className="w-full max-w-xs">
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ease-linear ${getProgressColor()}`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      
      {/* Helper Text */}
      <p className="text-sm text-gray-500">
        Code expires in {formatTime(timeRemaining)}
      </p>
    </div>
  );
};

export default Timer;