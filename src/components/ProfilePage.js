import React from 'react';
import './ProfilePage.css';

const ProfilePage = ({ user, onBack, onLogout }) => {
  if (!user) return null;
  const signupDate = user.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString()
    : '';
  const initial = user.displayName ? user.displayName[0].toUpperCase() : 'U';
  return (
    <div className="profile-page-bg">
      <div className="profile-page-card">
        <button className="profile-back" onClick={onBack}>&larr; Back</button>
        <div className="profile-pic-large-wrapper">
          {user.photoURL ? (
            <img
              className="profile-pic-large"
              src={user.photoURL}
              alt="Profile"
            />
          ) : (
            <span className="profile-icon-large">{initial}</span>
          )}
        </div>
        <h2>Hello, {user.displayName || 'Student'}!</h2>
        <div className="profile-email">{user.email}</div>
        <div className="profile-date">Signed up: {signupDate}</div>
        <button className="logout-btn" onClick={onLogout}>Log Out</button>
      </div>
    </div>
  );
};

export default ProfilePage; 