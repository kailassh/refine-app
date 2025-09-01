import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './components/LoginPage';
import { OTPVerification } from './components/OTPVerification';
import { HomePage } from './components/HomePage';
import { AuthLayout } from './components/AuthLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuth } from './hooks/useAuth';

/**
 * Main application component that handles routing and authentication flow.
 * 
 * This component serves as the root of the application and manages routing
 * between authentication pages and protected content. It provides the overall
 * application structure with React Router and authentication state management.
 * 
 * @returns The complete application with routing
 * 
 * @example
 * ```tsx
 * import App from './App';
 * 
 * function AppRoot() {
 *   return <App />;
 * }
 * ```
 */
function App() {
  // Get authentication state and handlers from the useAuth hook
  const { 
    authState, 
    loginWithEmail, 
    verifyOTP, 
    resendOTP, 
    logout, 
    goBackToEmail 
  } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Authentication Routes */}
        <Route 
          path="/login" 
          element={
            authState.isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <AuthLayout>
                {authState.authStep === 'otp_verification' ? (
                  <OTPVerification
                    email={authState.pendingEmail || ''}
                    onVerifyOTP={verifyOTP}
                    onResendOTP={resendOTP}
                    onGoBack={goBackToEmail}
                    isLoading={authState.isLoading}
                    error={authState.error}
                    timerState={authState.otpTimer}
                  />
                ) : (
                  <LoginPage
                    onEmailLogin={loginWithEmail}
                    isLoading={authState.isLoading}
                    error={authState.error}
                  />
                )}
              </AuthLayout>
            )
          } 
        />

        {/* Protected Routes */}
        <Route 
          path="/home" 
          element={
            <ProtectedRoute authState={authState}>
              <HomePage 
                user={authState.user!}
                onSignOut={logout}
                isSigningOut={authState.isLoading}
              />
            </ProtectedRoute>
          } 
        />

        {/* Default Route */}
        <Route 
          path="/" 
          element={
            <Navigate 
              to={authState.isAuthenticated ? "/home" : "/login"} 
              replace 
            />
          } 
        />

        {/* Catch-all Route */}
        <Route 
          path="*" 
          element={
            <Navigate 
              to={authState.isAuthenticated ? "/home" : "/login"} 
              replace 
            />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
