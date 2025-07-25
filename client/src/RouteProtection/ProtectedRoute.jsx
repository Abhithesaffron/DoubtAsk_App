import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminContext } from '../Context/AdminContext.jsx';

const ProtectedRoute = ({ children }) => {
  const { isAdminLoggedIn, isUserLoggedIn } = useAdminContext();

   // Check if the current route is for admin or user
  if (window.location.pathname.includes('/admin-home') && !isAdminLoggedIn) {
    return <Navigate to="/" />;
  }

  if (window.location.pathname.includes('/user-home') && !isUserLoggedIn) {
    return <Navigate to="/" />;
  }

  // Render protected content if all checks pass
  return children;
};

export default ProtectedRoute;
