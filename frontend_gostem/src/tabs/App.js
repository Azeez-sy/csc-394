import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import goStemLogo from './components/GoStemLogo.png';
import './styles/App.css';

import LandingPage from "./landing-page";
import NotePage from "./note-page";
import ChatPage from "./chats-page";
import HoursPage from "./hours-page";
import ProfilePage from "./profile-page";
import SchedulePage from "./schedule-page";
import AdminHoursPage from "./admin/admin-hours-page";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/landing-page" component={LandingPage} />
        <Route path="/note-page" component={NotePage} />
        <Route path="/chats-page" component={ChatPage} />
        <Route path="/hours-page" component={HoursPage} />
        <Route path="/profile-page" component={ProfilePage} />
        <Route path="/schedule-page" component={SchedulePage} />
        <Route path="/admin-hours-page" component={AdminHoursPage} />
      </Switch>
    </Router>
  );
}

const Home = () => {
  return (
    <div className="App">
      <header className="Landing-page">
        <img src={goStemLogo} className="App-logo" alt="logo" />
        <Link to="/landing-page">
          <button className="Login-button">
            Login
          </button>
        </Link>
      </header>
    </div>
  );
};

export default App;
