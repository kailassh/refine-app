/**
 * Logo component - Brand logo for the Refine application.
 * 
 * A simple text-based logo component that displays the application branding.
 * The logo consists of the word "refine" with a subtle gray dot, creating
 * a clean and minimal brand identity.
 * 
 * @fileoverview Application logo component
 */

import React from 'react';
import { Typography, Box } from '@mui/material';

/**
 * Props interface for the Logo component.
 */
interface LogoProps {
  /** Additional CSS classes to apply to the logo container */
  className?: string;
}

/**
 * Logo component that displays the Refine brand.
 * 
 * Renders the application logo as styled text with consistent typography.
 * The logo is designed to be flexible and can accept additional styling
 * through the className prop.
 * 
 * @param props - Component props
 * @returns Logo element with brand text
 * 
 * @example
 * ```tsx
 * // Basic logo
 * <Logo />
 * 
 * // Logo with additional styling
 * <Logo className="text-2xl mb-4" />
 * ```
 */
export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <Typography 
      variant="h5"
      className={className}
      sx={{
        fontWeight: 500,
        color: 'text.primary',
        display: 'inline-flex',
        alignItems: 'baseline'
      }}
    >
      {/* Main brand text */}
      refine
      {/* Brand accent - subtle dot */}
      <Box 
        component="span" 
        sx={{ 
          color: 'text.secondary',
          ml: 0.2
        }}
      >
        .
      </Box>
    </Typography>
  );
};

export default Logo;