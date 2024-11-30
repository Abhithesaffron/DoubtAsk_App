import React, { createContext, useState, useContext } from 'react';

// Create a Context
const AdminContext = createContext();

// AdminContext Provider component
export const AdminProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  return (
    <AdminContext.Provider value={{ isAdminLoggedIn, setIsAdminLoggedIn, isUserLoggedIn, setIsUserLoggedIn }}>
      {children}
    </AdminContext.Provider>
  );
};

// Custom hook to use the Admin context
export const useAdminContext = () => {
  return useContext(AdminContext);
};
