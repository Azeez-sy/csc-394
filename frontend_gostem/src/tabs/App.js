import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, Redirect, useHistory } from "react-router-dom";
import goStemLogo from './components/GoStemLogo.png';
import './styles/App.css';
import { auth, provider, signInWithPopup } from "./firebase-config";  // Firebase setup

import LandingPage from "./landing-page";
import NotePage from "./note-page";
import ChatPage from "./chats-page";
import HoursPage from "./hours-page";
import ProfilePage from "./profile-page";
import SchedulePage from "./schedule-page";
import AdminSchedulePage from "./admin/admin-schedule-page";
import ProgramsManager from './program-page'; 

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

function MainApp() {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);
  const history = useHistory();

  // Check if user is already logged in
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedAdmin = localStorage.getItem("isAdmin") === "true"; // Ensure it's converted to boolean
  
    if (storedToken && storedUser) {
      console.log("Restoring session from localStorage", storedUser); // Debugging output
      setAuthToken(storedToken);
      setUser(storedUser);
    }
  }, []);
  

  // Google Login Function
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user;
  
      const response = await fetch("http://localhost:8000/api/google-login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: googleUser.email,
          name: googleUser.displayName,
          profile_picture: googleUser.photoURL,
        }),
      });
  
      const data = await response.json();
      console.log("Google Login API Response:", data);
  
      if (data.key) {
        localStorage.setItem("authToken", data.key);
        localStorage.setItem("user", JSON.stringify({ 
          email: data.user.email, 
          displayName: data.user.name,  // Changed 'name' to 'displayName'
          photoURL: data.user.photoURL || googleUser.photoURL, // Changed 'profile_picture' to 'photoURL'
          role: data.user.role
        }));
  
        setAuthToken(data.key);
        setUser({
          email: data.user.email, 
          displayName: data.user.name,  // Changed to match localStorage
          photoURL: data.user.photoURL || googleUser.photoURL, // Changed to match localStorage
          role: data.user.role
        });
  
        console.log("Stored user data:", localStorage.getItem("user"));
  
        setTimeout(() => {
          history.push("/landing-page");
        }, 500);
      } else {
        console.error("Login failed:", data);
      }
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };
  
  
  
  


  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setAuthToken(null);
    setUser(null);
    history.push("/");  // Redirect to home on logout
  };

  // Login screen component
  const LoginScreen = () => (
    <div className="App">
      <header className="Landing-page">
        <img src={goStemLogo} className="App-logo" alt="logo" />
        <button className="Login-button" onClick={handleGoogleLogin}>
          Login with Google
        </button>
      </header>
    </div>
  );

  // Application layout with navigation for authenticated users
  const AuthenticatedLayout = ({ children }) => (
    <div className="App">
      {/* <header className="App-header">
        <img src={goStemLogo} className="App-logo" alt="logo" />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ color: 'black', margin: '0 10px' }}>✅ Logged in as {user?.name}</p>
          <button className="Logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </header> */}
      {children}
    </div>
  );

  // Check if user is authenticated
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        authToken ? (
          <AuthenticatedLayout>
            <Component {...props} />
          </AuthenticatedLayout>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );

  // For components with sidebar that need logout functionality
  const withLogout = (Component) => (props) => <Component {...props} handleLogout={handleLogout} />;

  // Store admin status in local storage
  const handleLoginSuccess = (token, isAdmin) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("isAdmin", isAdmin ? "true" : "false"); // Store admin status
  };

  return (
    <Switch>
      <Route exact path="/" render={() => (
        authToken ? <Redirect to="/landing-page" /> : <LoginScreen />
      )} />
      
      <Route 
        path="/landing-page" 
        render={(props) => 
          authToken ? <LandingPage {...props} handleLogout={handleLogout} /> : <Redirect to="/" />
        } 
      />
      <PrivateRoute path="/note-page" component={withLogout(NotePage)} />
      <PrivateRoute path="/chats-page" component={withLogout(ChatPage)} />
      <PrivateRoute path="/hours-page" component={withLogout(HoursPage)} />
      <PrivateRoute path="/profile-page" component={withLogout(ProfilePage)} />
      <PrivateRoute path="/schedule-page" component={withLogout(SchedulePage)} />
      <PrivateRoute path="/admin-schedule-page" component={withLogout(AdminSchedulePage)} />
      <PrivateRoute path="/programs-manager" component={withLogout(ProgramsManager)} />
    </Switch>
  );
}

export default App;