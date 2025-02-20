import React from "react";
import "./styles/profile-page.css"
import Sidebar from './components/sidebar';

const ProfileContent = () => {
  return (
    <div className="profile-body">
      <header className="profile-header">
        <h1>Profile</h1>
      </header>
      </div>
  );
};

const ProfilePage = () => {
  return (
  <div className="chat-page-container">
      <Sidebar />
      <ProfileContent/>
  </div>
  );
};
export default ProfilePage;
