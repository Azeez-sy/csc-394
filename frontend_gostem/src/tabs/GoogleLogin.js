import React from "react";
import { auth, provider, signInWithPopup } from "./firebase-config";

const GoogleLogin = ({ onLoginSuccess }) => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Send user data to Django
      const response = await fetch("http://localhost:8000/api/google-login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          name: user.displayName,
          profile_picture: user.photoURL,
        }),
      });

      const data = await response.json();
      if (data.key) {
        console.log("Django Auth Token:", data.key);
        localStorage.setItem("authToken", data.key); // Save token in local storage
        onLoginSuccess(data.key);
      }
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  return <button onClick={handleGoogleLogin}>Login with Google</button>;
};

export default GoogleLogin;
