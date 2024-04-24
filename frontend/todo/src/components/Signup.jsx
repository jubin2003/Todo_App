import React, { useState } from 'react';
import axios from 'axios'; // Import Axios library
import './Signup.css';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 
  const handleSignup = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    
    try {
      // Send POST request to backend
      const response = await axios.post('http://localhost:1080/api/v1/register', {
        email,
        username,
        password
      });
      console.log('Response:', response); // Log the entire response object
      
      // Display alert upon successful registration
      alert('Registration successful');

      // Clear input fields after successful signup
      setEmail('');
      setUsername('');
      setPassword('');
      navigate('/signin');
    } catch (error) {
      console.error('Signup failed:', error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <div className="input-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
