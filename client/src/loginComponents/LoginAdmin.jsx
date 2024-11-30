import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminContext } from '../Context/AdminContext'; // Import the context
import './LoginSignup.css';

const LoginAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to handle error messages
  const { setIsAdminLoggedIn } = useAdminContext(); // Access the context
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message before trying to log in

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // If the login is successful, store the token in localStorage
        

        // Set admin login state to true if the user is an admin
        if (data.isAdmin) {
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('userName', data.userName);
          localStorage.setItem('userId', data.userId);
          
          setIsAdminLoggedIn(true);
          // Navigate to the AdminHomePage
          navigate('/admin-home');
          alert('Admin login successful!');
        } else {
          alert('You are not an admin!');
          setError('You are not an admin!');
        }
      } else {
        setError(data.error || 'Login failed!');
      }
    } catch (error) {
      setError('Admin login failed! Please try again later.');
    }
  };

  return (
    <div className="login-form-container">
      <h1>Login as Admin</h1>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        <button type="submit">Login</button>
      </form>
      
      {/* Display error message if any */}
      {error && <div className="error-message">{error}</div>}

      <button className="google-login">Login with Google</button>
    </div>
  );
};

export default LoginAdmin;
