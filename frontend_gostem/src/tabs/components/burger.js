import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/burger.css';

import menuIcon from '../components/icons/menu.png';
import clock from '../components/icons/clock.png';
import chat from '../components/icons/chat.png';
import gear from '../components/icons/gear.png';
import home from '../components/icons/logo.png';
import logout from '../components/icons/logout.png';
import notes from '../components/icons/notes.png';
import schedule from '../components/icons/schedule.png';
import user from '../components/icons/user.png';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Toggle menu open/close
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Add event listener
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Clean up event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="burger-container" ref={menuRef}>
      {/* Burger Button */}
      <button className="burger-button" onClick={toggleMenu}>
        <img src={menuIcon} alt="Menu" />
      </button>

      {/* Burger Menu */}
      <div className={`burger-menu ${isOpen ? 'open' : ''}`}>
        <div className="burger-item">
          <Link className="link" to="./landing-page">
            <button className="burger-image-button">
              <img src={home} alt="Home" />
              <span className="burger-button-text">Home</span>
            </button>
          </Link>
        </div>
        <div className="burger-item">
          <Link className="link" to="./note-page">
            <button className="burger-image-button">
              <img src={notes} alt="Notes" />
              <span className="burger-button-text">Notes</span>
            </button>
          </Link>
        </div>
        <div className="burger-item">
          <Link className="link" to="./schedule-page">
            <button className="burger-image-button">
              <img src={schedule} alt="Schedule" />
              <span className="burger-button-text">Schedule</span>
            </button>
          </Link>
        </div>
        <div className="burger-item">
          <Link className="link" to="./hours-page">
            <button className="burger-image-button">
              <img src={clock} alt="Hours" />
              <span className="burger-button-text">Hours</span>
            </button>
          </Link>
        </div>
        <div className="burger-item">
          <Link className="link" to="./chats-page">
            <button className="burger-image-button">
              <img src={chat} alt="Chats" />
              <span className="burger-button-text">Chats</span>
            </button>
          </Link>
        </div>
        <div className="burger-item">
          <Link className="link" to="./profile-page">
            <button className="burger-image-button">
              <img src={user} alt="Profile" />
              <span className="burger-button-text">Profile</span>
            </button>
          </Link>
        </div>

        <div className="burger-divider"></div>

        <div className="burger-item">
          <Link className="link" to="./settings-page">
            <button className="burger-image-button">
              <img src={gear} alt="Settings" />
              <span className="burger-button-text">Settings</span>
            </button>
          </Link>
        </div>
        <div className="burger-item">
          <Link className="link" to="./logout">
            <button className="burger-image-button">
              <img src={logout} alt="Logout" />
              <span className="burger-button-text">Logout</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
