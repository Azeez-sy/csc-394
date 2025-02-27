import './styles/landing-page.css';
import clock from './components/icons/clock.png'
import chat from './components/icons/chat.png'
// import gear from './components/icons/gear.png'
// import logout from './components/icons/logout.png'
import notes from './components/icons/notes.png'
import schedule from './components/icons/schedule.png'
import user from './components/icons/user.png'
import globe from './components/icons/globe.png'
// import BurgerMenu from './components/burger';  
// import Sidebar from './components/sidebar';  

import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


const LandingPage = () => {


  // const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth <= 768);
  //   };

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);



  return (
    
    <div className="body">
      <header className="landing-header">
        <h1>Welcome to GoStem</h1>
      </header>

      {/* <BurgerMenu /> */}
      {/* Show Sidebar on Large Screens, Hamburger Menu on Small Screens */}
      {/* <BurgerMenu /> */}


      <div className="button-grid">
        <a href="https://thegostem.org/" target="_blank" rel="noopener noreferrer">
          <button className="image-button">
            <img src={globe} alt="globe" />
            <br></br>
            <span className="button-text">Website</span>
          </button>
        </a>
        <Link to="./note-page">
          <button className="image-button">
            <img src={notes} alt="Notes" />
            <br></br>
            <span className="button-text">Notes</span>
          </button>
        </Link>
        <Link to="./schedule-page">
          <button className="image-button">
            <img src={schedule} alt="Schedule" />
            <br></br>
            <span className="button-text">Schedule</span>
          </button>
        </Link>
        <Link to="./hours-page">
          <button className="image-button">
            <img src={clock} alt="Hours" />
            <br></br>
            <span className="button-text">Hours</span>
          </button>
        </Link>
        <Link to="./chats-page">
          <button className="image-button">
            <img src={chat} alt="Chats" />
            <br></br>
            <span className="button-text">Chats</span>
          </button>
        </Link>
        <Link to="./profile-page">
          <button className="image-button">
            <img src={user} alt="Profile" />
            <br></br>
            <span className="button-text">Profile</span>
          </button>
        </Link>
      </div>

      <div className="bottom-buttons">

        <Link to="">
          <button className="bottom-button">Settings</button>
        </Link>
        
        <Link to="./">
          <button className="bottom-button">Log Out</button>
        </Link>

      </div>

    </div>
  );
};

export default LandingPage;
