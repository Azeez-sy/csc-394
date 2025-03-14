import React, { useEffect, useState } from "react";
import "./styles/profile-page.css"
import Sidebar from './components/sidebar';

const ProfileContent = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user data from localStorage instead of API
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }   
    setLoading(false);
  }, []);

  return (
    <div className="profile-body">
      <header className="profile-header">
        <h1>Profile</h1>
      </header>
      {loading ? (
        <p>Loading profile...</p>
      ) : user ? (
        <div className="profile-info">
          <img src={user.profile_picture} alt="Profile" className="profile-pic" />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ) : (
        <p>Could not load profile. Please try logging in again.</p>
      )}
    </div>
  );
};

const ProfilePage = ({ handleLogout }) => {
  return (
  <div className="chat-page-container">
      <Sidebar handleLogout={handleLogout} />
      <ProfileContent/>
  </div>
  );
};
export default ProfilePage;
