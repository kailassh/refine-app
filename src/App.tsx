import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage, OTPVerification } from './components/features/auth';
import { HomePage } from './components/features/chat';
import { AuthLayout, ProtectedRoute } from './components/layout';
import { useAuth } from './hooks/auth';
import { AppProviders } from './contexts';
import { ErrorBoundary } from './components/shared';
import { MuiThemeProvider } from './theme/index';

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
    <MuiThemeProvider>
      <AppProviders>
        <ErrorBoundary>
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
    </ErrorBoundary>
  </AppProviders>
</MuiThemeProvider>
  );
}

export default App;
