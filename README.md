# Refine App

An AI-powered text refinement and chat application built with React 19, TypeScript, Material UI, and Supabase authentication. This application provides a clean, modern interface for users to interact with AI through a conversational chat experience.

## Business Logic Overview

### Core Functionality
- **AI Chat Interface**: Interactive chat system with mock AI responses for text refinement and conversation
- **Email OTP Authentication**: Secure passwordless login using Supabase email OTP verification
- **Session Management**: Persistent user sessions with automatic token refresh
- **Chat Persistence**: Local storage-based chat history with import/export capabilities
- **Responsive Design**: Material UI components with consistent theming and mobile-first approach

### Key Features
- **Passwordless Authentication**: Users log in using email OTP verification (no passwords required)
- **Real-time Chat**: Simulated AI responses with typing indicators and error handling
- **Session Persistence**: Automatic session restoration on app reload
- **Chat History**: Local storage of conversations with full export/import functionality
- **Error Boundaries**: Comprehensive error handling with user-friendly messages
- **Loading States**: Proper loading indicators throughout the application

## Project Architecture

### Technology Stack
- **Frontend**: React 19 + TypeScript + Vite
- **UI Framework**: Material UI v7 with Emotion styling
- **Authentication**: Supabase with email OTP
- **State Management**: React Context + Custom Hooks
- **Routing**: React Router DOM v7
- **Build Tool**: Vite with TypeScript compilation
- **Code Quality**: ESLint + TypeScript strict mode

### Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── features/        # Feature-specific components
│   │   ├── auth/        # Authentication components (Login, OTP)
│   │   └── chat/        # Chat interface components
│   ├── layout/          # Layout components (Header, Routes)
│   ├── shared/          # Shared utility components
│   └── ui/              # Basic UI components
├── contexts/            # React Context providers
│   ├── AuthContext.tsx  # Authentication state management
│   ├── ChatContext.tsx  # Chat state management
│   └── UIContext.tsx    # UI state and theming
├── hooks/               # Custom React hooks
│   ├── auth/           # Authentication-related hooks
│   ├── chat/           # Chat functionality hooks
│   └── shared/         # Shared utility hooks
├── services/            # Business logic and API services
│   ├── api/            # API service layer
│   ├── supabase/       # Supabase integration
│   └── error/          # Error handling utilities
├── types/               # TypeScript type definitions
├── utils/               # Utility functions and constants
├── theme/               # Material UI theme configuration
└── styles/             # Global styles and CSS
```

### Authentication Flow
1. **Email Input**: User enters email address
2. **OTP Generation**: Supabase sends 6-digit OTP to email
3. **OTP Verification**: User enters OTP with 2-minute timer
4. **Session Creation**: Successful verification creates persistent session
5. **Auto-restoration**: Sessions persist across browser reloads

### Chat System
- **Mock AI Responses**: Intelligent response selection based on user input
- **Message Persistence**: Chat history stored in localStorage
- **Real-time Updates**: Immediate UI updates with loading states
- **Error Recovery**: Graceful handling of network and system errors
- **Export/Import**: Full chat backup and restoration capabilities

## Development

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Getting Started
```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### Development Commands
- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run lint` - Run ESLint on all TypeScript/TSX files
- `npm run preview` - Preview production build locally

### Code Quality Standards
- **Strict TypeScript**: No `any` types, proper generics, exhaustive type checking
- **React Best Practices**: Proper state management, effect cleanup, performance optimization
- **Error Handling**: Comprehensive try-catch, error boundaries, user-friendly messages
- **Accessibility**: Full keyboard navigation, screen reader support, focus management
- **Testing-ready**: Components designed for easy unit/integration testing

### Architecture Patterns
- **Custom Hooks**: Business logic separated from UI components
- **Compound Components**: Complex UI patterns with proper composition
- **Service Layer**: Clean separation of concerns with dedicated service classes
- **Error Boundaries**: Graceful error handling at component boundaries
- **Context Pattern**: State management without prop drilling

## Deployment

The application is optimized for deployment on modern web platforms:
- **Static Build**: Generates optimized static files for CDN deployment
- **Environment Variables**: Supabase configuration via environment variables
- **Modern Browsers**: Targets ES2022 with automatic polyfills
- **Performance**: Code splitting, lazy loading, and optimized bundles
