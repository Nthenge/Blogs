import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css'

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/create" className="nav-link">Create Post</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
