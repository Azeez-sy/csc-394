// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import goStemLogo from './components/GoStemLogo.png';
import './styles/App.css';

import LandingPage from "./landing-page";
import NotePage from "./note-page";
import ChatPage from "./chats-page";
import HoursPage from "./hours-page";
import ProfilePage from "./profile-page";
import SchedulePage from "./schedule-page";
import AdminSchedulePage from "./admin/admin-schedule-page";

function App() {
  // For testing purposes, set userRole to "admin" manually.
  const [userRole] = useState('admin');

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/landing-page" component={LandingPage} />
        <Route path="/note-page" component={NotePage} />
        <Route path="/chats-page" component={ChatPage} />
        <Route path="/hours-page" component={HoursPage} />
        <Route path="/profile-page" component={ProfilePage} />
        <Route 
          path="/schedule-page" 
          render={(props) => <SchedulePage {...props} userRole={userRole} />} 
        />
        <Route 
          path="/admin-schedule-page" 
          render={(props) => <AdminSchedulePage {...props} userRole={userRole} />} 
        />
      </Switch>
    </Router>
  );
}

const Home = () => {
  return (
    <div className="App">
      <header className="Landing-page">
        <img src={goStemLogo} className="App-logo" alt="logo" />
        <a href="/accounts/google/login/?process=login">
          <button className="Login-button">
            Login
          </button>
        </a>
      </header>
    </div>
  );
};

export default App;
