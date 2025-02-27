import React, { useEffect, useState } from "react";
import "./styles/profile-page.css"
import Sidebar from './components/sidebar';

// const ProfileContent = () => {
//   return (
//     <div className="profile-body">
//       <header className="profile-header">
//         <h1>Profile</h1>
//       </header>
//       </div>
//   );
// };

const ProfileContent = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/profile/")
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  return (
    <div className="profile-body">
      <header className="profile-header">
        <h1>Profile</h1>
      </header>
      {user ? (
        <div className="profile-info">
          <img src={user.profile_picture} alt="Profile" className="profile-pic" />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
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
