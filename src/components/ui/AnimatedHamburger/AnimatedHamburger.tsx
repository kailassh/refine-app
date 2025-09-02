/**
 * Animated hamburger menu icon component.
 * 
 * This component provides a smooth animated transition between hamburger menu
 * lines and an X/close icon. Uses CSS transforms for smooth line morphing.
 * 
 * @fileoverview Animated hamburger menu icon with smooth transformations
 */

import React from 'react';

/**
 * Props interface for the AnimatedHamburger component.
 */
interface AnimatedHamburgerProps {
  /** Whether the menu is open (shows X) or closed (shows hamburger) */
  isOpen: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Size of the icon (default: w-5 h-5) */
  size?: 'sm' | 'md' | 'lg';
  /** Color of the lines */
  color?: string;
}

/**
 * AnimatedHamburger functional component.
 * 
 * Renders an animated hamburger menu icon that smoothly transforms between
 * three horizontal lines (closed state) and an X shape (open state).
 * 
 * @param props - Component props including state and styling
 * @returns JSX element representing the animated hamburger icon
 */
export const AnimatedHamburger: React.FC<AnimatedHamburgerProps> = ({
  isOpen,
  className = '',
  size = 'md',
  color = 'currentColor'
}) => {
  // Size classes based on size prop
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5', 
    lg: 'w-6 h-6'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`} role="img" aria-label="Menu toggle">
      <svg
        className="w-full h-full"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top line */}
        <line
          x1="4" y1="6" x2="20" y2="6"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          className={`transition-all duration-300 ease-in-out ${
            isOpen 
              ? 'rotate-45' 
              : 'rotate-0'
          }`}
          style={{ 
            transformOrigin: '12px 12px',
            transform: isOpen ? 'rotate(45deg) translate(6px, 6px)' : 'rotate(0deg) translate(0, 0)'
          }}
        />
        
        {/* Middle line */}
        <line
          x1="4" y1="12" x2="20" y2="12"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          className={`transition-all duration-200 ease-in-out ${
            isOpen 
              ? 'opacity-0 scale-0' 
              : 'opacity-100 scale-100'
          }`}
          style={{ 
            transformOrigin: '12px 12px'
          }}
        />
        
        {/* Bottom line */}
        <line
          x1="4" y1="18" x2="20" y2="18"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          className={`transition-all duration-300 ease-in-out ${
            isOpen 
              ? '-rotate-45' 
              : 'rotate-0'
          }`}
          style={{ 
            transformOrigin: '12px 12px',
            transform: isOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'rotate(0deg) translate(0, 0)'
          }}
        />
      </svg>
    </div>
  );
};

export default AnimatedHamburger;