import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { AdminProvider } from './Context/AdminContext'; // Context provider
import StartingPage from './loginComponents/StartingPage';
import LoginUser from './loginComponents/LoginUser';
import LoginAdmin from './loginComponents/LoginAdmin';
import SignupUser from './loginComponents/SignupUser';
import AdminHomePage from './Homepage/AdminPage/AdminHomePage';
import UserHomePage from './Homepage/UserPage/UserHomePage';
import ProtectedRoute from './RouteProtection/ProtectedRoute'; // Protect routes
import { ToastContainer } from 'react-toastify';
import './App.css'; // Import App-specific CSS

const App = () => {
  return (
    <AdminProvider>
      <Router>
      <div className="app-container full-screen-center">
      <ToastContainer /> {/* Toast container */}
          <Routes>
            {/* Starting Page */}
            <Route path="/" element={<StartingPage />} />

            {/* Login Pages */}
            <Route path="/login-user" element={<LoginUser />} />
            <Route path="/login-admin" element={<LoginAdmin />} />

            {/* Signup Page */}
            <Route path="/signup-user" element={<SignupUser />} />

            {/* Admin Protected Route */}
            <Route
              path="/admin-home"
              element={
                <ProtectedRoute>
                  <AdminHomePage />
                </ProtectedRoute>
              }
            />

            {/* User Protected Route */}
            <Route
              path="/user-home"
              element={
                <ProtectedRoute>
                  <UserHomePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AdminProvider>
  );
};

export default App;
