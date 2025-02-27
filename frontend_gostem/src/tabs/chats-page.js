import React from "react";
import "./styles/chats-page.css"
import Sidebar from './components/sidebar';


const ChatContent = () => {
  return (
    <div className="chat-body"> 
      <div><h1>Chat</h1></div> 
    </div>
  );
};


const ChatPage = () => {
  return (
  <div className="chat-page-container">
      <Sidebar />
      <ChatContent/>
  </div>
  );
};

export default ChatPage;
