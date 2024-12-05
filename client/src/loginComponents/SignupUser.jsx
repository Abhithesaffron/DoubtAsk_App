import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toast CSS
import './LoginSignup.css';

const SignupUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Define the signup API call
    const signupApiCall = async () => {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/login-user'); // Navigate to login page on successful signup
        return data.message || 'Signup successful!';
      } else {
        throw new Error(data.error || 'Signup unsuccessful!');
      }
    };

    // Show a promise-based toast
    toast.promise(signupApiCall(), {
      pending: 'Creating your account, please wait...',
      success: 'Signup successful! Redirecting to login page...',
      error: 'Signup failed! Please try again.',
    });
  };

  return (
    <div className="login-form-container">
      <h1>Signup as User</h1>
      <form onSubmit={handleSignup}>
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
        <button type="submit">Signup</button>
      </form>
      {/* <button className="google-login">Signup with Google</button> */}
    </div>
  );
};

export default SignupUser;
