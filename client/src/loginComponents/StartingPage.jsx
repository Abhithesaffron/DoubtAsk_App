import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StartingPage.css';

const StartingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="starting-page-container">
      <h1 className="welcome-heading">Welcome to the App</h1>
      <div className="button-group">
        <button
          className="navigate-button"
          onClick={() => navigate('/login-user')}
        >
          Login as User
        </button>
        <button
          className="navigate-button"
          onClick={() => navigate('/login-admin')}
        >
          Login as Admin
        </button>
        <button
          className="navigate-button signup-button"
          onClick={() => navigate('/signup-user')}
        >
          Signup as User
        </button>
      </div>
    </div>
  );
};

export default StartingPage;
