import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a Context
const AdminContext = createContext();

// AdminContext Provider component
export const AdminProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(localStorage.getItem('authToken') && localStorage.getItem('userName')==="Abhishek@gmail.com"?true:false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(localStorage.getItem('authToken')?true:false);
  
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
