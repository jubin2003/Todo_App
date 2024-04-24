import React, { useState } from 'react';
import axios from 'axios';
import './SignIn.css';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 
  const handleSignIn = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:1080/api/v1/login', {
        email,
        password
      });

      alert('Login successful');
      // Redirect to the dashboard or desired page after successful login
      navigate('/');
    } catch (error) {
      console.error('Sign in failed:', error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div className="signin-container">
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
        <div className="input-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="signin-button">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
