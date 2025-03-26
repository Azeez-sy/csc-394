import React, { useState, useEffect } from 'react';
import Sidebar from './components/sidebar'; // Note the ../ to go up one directory
import AdminEmailManager from '../components/AdminEmailManager'; // Same here
import AllowedEmailManager from '../components/AllowedEmailManager';
import './styles/profile-page.css';

const ProfilePage = ({ handleLogout }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Get user info from local storage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUserInfo(user);
    
    // Check if user is faculty/admin
    // Adjust this logic based on how you store user role
    setIsAdmin(user.role === 'faculty');
  }, []);

  return (
    <div className="profile-page-container">
      <Sidebar handleLogout={handleLogout} />
      
      <div className="profile-content">
        <h2 className="page-title">My Profile</h2>
        
        <div className="profile-card">
          <div className="profile-header">
            {userInfo.photoURL ? (
              <img src={userInfo.photoURL} alt="Profile" className="profile-photo" />
            ) : (
              <div className="profile-photo-placeholder">
                {userInfo.name ? userInfo.name.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
            <div className="profile-info">
              <h3>{userInfo.name || 'User'}</h3>
              <p>{userInfo.email || 'No email'}</p>
              <p className="user-role">Role: {userInfo.role || 'Tutor'}</p>
            </div>
          </div>
        </div>
        
        {/* Only show admin tools for faculty/admins */}
        {isAdmin && (
          <div className="admin-section">
            <h2 className="section-title">Admin Tools</h2>
            <AdminEmailManager />
            
            {/* Add the new component */}
            <div className="admin-tool-spacer" style={{ height: '30px' }}></div>
            <AllowedEmailManager />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
