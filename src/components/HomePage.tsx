/**
 * HomePage component - Main dashboard for authenticated users.
 * 
 * This component serves as the primary interface for authenticated users
 * after successful login. It includes the header navigation, welcome content,
 * and placeholder areas for future features. The component is designed to
 * be the starting point for the main application functionality.
 * 
 * @fileoverview Home page component for authenticated users
 */

import React from 'react';
import { Header } from './Header';
import { type User } from '../types/auth';

/**
 * Props interface for the HomePage component.
 */
interface HomePageProps {
  /** Current authenticated user data */
  user: User;
  /** Callback function triggered when user signs out */
  onSignOut?: () => void;
  /** Whether sign out operation is in progress */
  isSigningOut?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * HomePage functional component.
 * 
 * Renders the main authenticated user interface including navigation header,
 * welcome message, and placeholder content areas. This serves as the foundation
 * for future application features and demonstrates successful authentication.
 * 
 * @param props - Component props including user data and callbacks
 * @returns JSX element representing the home page
 */
export const HomePage: React.FC<HomePageProps> = ({
  user,
  onSignOut,
  isSigningOut = false,
  className = ''
}) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Header Navigation */}
      <Header 
        user={user}
        onSignOut={onSignOut}
        isSigningOut={isSigningOut}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="p-6 bg-white border rounded-lg border-gray-200 shadow-sm">
            <div className="text-center space-y-4">
              <h1 className="heading-primary text-center">
                Welcome to Text Refine App
              </h1>
              <p className="max-w-2xl mx-auto text-lg text-gray-600">
                You're successfully authenticated and ready to start refining your text. 
                The main application features will be built here.
              </p>
              
              {/* User Welcome */}
              <div className="max-w-md mx-auto p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-900">
                  Hello, {user.email}!
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Account created: {new Date(user.createdAt).toLocaleDateString()}
                </p>
                {user.lastSignInAt && (
                  <p className="text-sm text-gray-500">
                    Last sign in: {new Date(user.lastSignInAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Feature Placeholder Sections */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Text Refinement Feature */}
          <div className="p-6 bg-white border rounded-lg border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                <svg 
                  className="w-6 h-6 text-blue-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Text Refinement</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Smart text processing and refinement tools will be available here.
            </p>
          </div>

          {/* History Feature */}
          <div className="p-6 bg-white border rounded-lg border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
                <svg 
                  className="w-6 h-6 text-green-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">History</h3>
            </div>
            <p className="text-gray-600 text-sm">
              View and manage your refinement history and saved results.
            </p>
          </div>

          {/* Settings Feature */}
          <div className="p-6 bg-white border rounded-lg border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg">
                <svg 
                  className="w-6 h-6 text-purple-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Settings</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Customize your preferences and manage account settings.
            </p>
          </div>
        </div>

        {/* Getting Started Section */}
        <div className="mt-8">
          <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border rounded-lg border-blue-200">
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              🚀 Getting Started
            </h2>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-6 h-6 text-sm font-medium bg-blue-100 rounded-full text-blue-600">
                  1
                </div>
                <p className="text-gray-700">
                  Your authentication system is now fully set up with email OTP verification
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-6 h-6 text-sm font-medium bg-blue-100 rounded-full text-blue-600">
                  2
                </div>
                <p className="text-gray-700">
                  Start building your text refinement features in this main content area
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-6 h-6 text-sm font-medium bg-blue-100 rounded-full text-blue-600">
                  3
                </div>
                <p className="text-gray-700">
                  Add new routes and components as your application grows
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;