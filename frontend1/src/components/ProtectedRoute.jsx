import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { isTokenExpired } from '../utils/authUtils';

const ProtectedRoute = ({ children }) => {
  const { user, token, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="container mt-5 pt-4 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Checking authentication...</p>
      </div>
    );
  }

  // Check if user is authenticated and token is valid
  if (!user || !token || isTokenExpired(token)) {
    // Redirect to login page with return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is authenticated, render the protected component
  return children;
};

export default ProtectedRoute;
