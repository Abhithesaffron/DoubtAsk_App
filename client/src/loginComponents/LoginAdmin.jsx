import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminContext } from '../Context/AdminContext'; // Import the context
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toast CSS
import './LoginSignup.css';

const LoginAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAdminLoggedIn } = useAdminContext(); // Access the context
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();

    // Show a pending toast while the API call is in progress
    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();

          if (response.ok) {
            if (data.isAdmin) {
              // Store admin info in localStorage
              localStorage.setItem('authToken', data.token);
              localStorage.setItem('userName', data.userName);
              localStorage.setItem('userId', data.userId);

              setIsAdminLoggedIn(true);
              navigate('/admin-home'); // Navigate to the admin page
              resolve('Admin login successful!');
            } else {
              reject('You are not an admin!');
            }
          } else {
            reject(data.error || 'Login failed!');
          }
        } catch (error) {
          reject('Admin login failed! Please try again later.');
        }
      }),
      {
        pending: 'Logging in as admin, please wait...',
        success: 'Admin login successful!',
        error: {
          render({ data }) {
            return data; // Display the error message returned from the API or promise
          },
        },
      }
    );
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
      {/* <button className="google-login">Login with Google</button> */}
    </div>
  );
};

export default LoginAdmin;
