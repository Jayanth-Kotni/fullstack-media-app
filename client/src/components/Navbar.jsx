import React from 'react';
import './Navbar.css';

const Navbar = ({ onUploadClick }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // or navigate using react-router
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">MediaVault</div>
      <div className="navbar-actions">
        <button className="upload-button" onClick={onUploadClick}>
          Upload
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
