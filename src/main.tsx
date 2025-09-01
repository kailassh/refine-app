/**
 * Application entry point and root renderer.
 * 
 * This file initializes the React application by creating a root element and
 * rendering the main App component within React's StrictMode. StrictMode enables
 * additional checks and warnings for React components during development.
 * 
 * The entry point:
 * 1. Imports global CSS styles
 * 2. Creates a React root from the DOM element with id 'root'
 * 3. Renders the App component wrapped in StrictMode
 * 
 * @fileoverview Entry point for the Refine React application
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Get the root DOM element and create React root
// The non-null assertion (!) is safe because the root element is guaranteed
// to exist in index.html
const rootElement = document.getElementById('root')!;

// Create React root and render the application
// StrictMode enables additional development-time checks and warnings
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
