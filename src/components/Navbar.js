import React from 'react';
import './Navbar.css';

const Navbar = ({ darkMode, onToggleDarkMode, user, onProfileClick, onSignUpClick, onLogoClick }) => (
  <nav className={`navbar${darkMode ? ' dark' : ''}`}>
    <div className="navbar-content">
      <button className="navbar-logo-btn" onClick={onLogoClick}>
        <span className="navbar-logo">OpenCalc</span>
      </button>
      <div className="navbar-actions">
        <button className="dark-toggle" onClick={onToggleDarkMode} aria-label="Toggle dark mode">
          {darkMode ? (
            <span role="img" aria-label="sun">🌞</span>
          ) : (
            <span role="img" aria-label="moon">🌙</span>
          )}
        </button>
        {user ? (
          <button className="profile-icon-btn" onClick={onProfileClick} aria-label="Profile">
            <span className="profile-icon">
              {user.displayName ? user.displayName[0].toUpperCase() : 'U'}
            </span>
          </button>
        ) : (
          <button className="signup-btn" onClick={onSignUpClick}>Sign Up</button>
        )}
      </div>
    </div>
  </nav>
);

export default Navbar; 