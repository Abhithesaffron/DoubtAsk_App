import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';

const SignupUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to the server to create a new user
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // Check if the signup was successful
      // console.log(response.ok , data);
      if (response.ok) {
        navigate('/login-user'); // Navigate to login page on successful signup
        alert('Signup successful!');
      } else {
        alert(data.error || 'Signup unsuccessful!'); // Show error message if signup fails
      }
    } catch (error) {
      alert('Signup failed! Please try again.');
    }
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
      <button className="google-login">Signup with Google</button>
    </div>
  );
};

export default SignupUser;
