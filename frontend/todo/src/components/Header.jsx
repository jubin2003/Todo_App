import React from "react";
import './Navbar.css';
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>Keeper</h1>
      <div className="navbar-right">
      <Link to="/" className="navbar-link">Home</Link>
          <Link to="/signin" className="navbar-link">Sign In</Link>
          <Link to="/signup" className="navbar-link">Sign Up</Link>
          <a href="/logout" className="navbar-link">Logout</a>
          </div>
    </header>
    
  );
}

export default Header;
