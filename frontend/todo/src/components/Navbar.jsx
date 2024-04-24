import React from 'react';
import './Navbar.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link className="navbar-left">
          <Link to="/" className="navbar-brand">Todo</Link>
        </Link>
        <div className="navbar-right">
          <Link to="/" className="navbar-link">Home</Link>
          <Link href="/signin" className="navbar-link">Sign In</Link>
          <a href="/signup" className="navbar-link">Sign Up</a>
          <a href="/logout" className="navbar-link">Logout</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
