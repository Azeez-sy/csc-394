import React from 'react';
import '../styles/sidebar.css'; 

import clock from '../components/icons/clock.png';
import chat from '../components/icons/chat.png';
import gear from '../components/icons/gear.png';
import home from '../components/icons/logo.png';
import logout from '../components/icons/logout.png';
import notes from '../components/icons/notes.png';
import schedule from '../components/icons/schedule.png';
import user from '../components/icons/user.png';


import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar-container">
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
        <div className="sidebar-item">
          <Link to="./chats-page">
            <button className="sidebar-image-button">
              <img src={chat} alt="Chats" />
              <span className="sidebar-button-text">Chats</span>
            </button>
          </Link>
        </div>
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
          <Link to="./settings-page">
            <button className="sidebar-image-button">
              <img src={gear} alt="Settings" />
              <span className="sidebar-button-text">Settings</span>
            </button>
          </Link>
        </div>
        <div className="sidebar-item">
          <Link to="./">
            <button className="sidebar-image-button">
              <img src={logout} alt="Logout" />
              <span className="sidebar-button-text">Logout</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;