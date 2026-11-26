import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null; // wait until session is read
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
};
