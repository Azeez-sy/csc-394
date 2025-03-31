import React, { useState, useEffect } from 'react';
import '../styles/sidebar.css'; 

import clock from '../components/icons/clock.png';
// import chat from '../components/icons/chat.png';
import home from '../components/icons/logo.png';
import logout from '../components/icons/logout.png';
import notes from '../components/icons/notes.png';
import schedule from '../components/icons/schedule.png';
import user from '../components/icons/user.png';

import { Link } from 'react-router-dom';

const Sidebar = ({ handleLogout }) => {
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    // Get user data from localStorage on component mount
    const userData = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(userData);
  }, []);

  return (
    <div className="sidebar-container">
      {currentUser && (
        <div className="sidebar-profile">
          <div className="profile-photo-container">
            {currentUser.photoURL ? (
              <img 
                src={currentUser.photoURL} 
                alt="Profile" 
                className="profile-photo" 
              />
            ) : (
              <div className="profile-photo-placeholder">
                {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
          </div>
          <span className="profile-name">{currentUser?.displayName || "User"}</span>
        </div>
      )}
      
      <div className="sidebar-top">
        <div className="sidebar-item">
          <Link to="./landing-page">
            <button className="sidebar-image-button">
              <img src={home} alt="Home" />
              <span className="sidebar-button-text">Home</span>
            </button>
          </Link>
        </div>
        <div className="sidebar-item">
          <Link to="./note-page">
            <button className="sidebar-image-button">
              <img src={notes} alt="Notes" />
              <span className="sidebar-button-text">Notes</span>
            </button>
          </Link>
        </div>
        <div className="sidebar-item">
          <Link to="./schedule-page">
            <button className="sidebar-image-button">
              <img src={schedule} alt="Schedule" />
              <span className="sidebar-button-text">Schedule</span>
            </button>
          </Link>
        </div>
        <div className="sidebar-item">
          <Link to="./hours-page">
            <button className="sidebar-image-button">
              <img src={clock} alt="Hours" />
              <span className="sidebar-button-text">Hours</span>
            </button>
          </Link>
        </div>
        {/* <div className="sidebar-item">
          <Link to="./chats-page">
            <button className="sidebar-image-button">
              <img src={chat} alt="Chats" />
              <span className="sidebar-button-text">Chats</span>
            </button>
          </Link>
        </div> */}
        <div className="sidebar-item">
          <Link to="./profile-page">
            <button className="sidebar-image-button">
              <img src={user} alt="Profile" />
              <span className="sidebar-button-text">Profile</span>
            </button>
          </Link>
        </div>
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-item">
          <button className="sidebar-image-button" onClick={handleLogout}>
            <img src={logout} alt="Logout" />
            <span className="sidebar-button-text">Logout</span>
          </button>
        </div>
      </div>
    </div>
    
  );
};

export default Sidebar;