import React, { useState } from "react";
import "./styles/chats-page.css";
import Sidebar from "./components/sidebar";

const ChatContent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userName, setUserName] = useState("Anonymous");

  const handleSend = () => {
    if (input.trim() !== "") {
      const newMessage = { user: userName, text: input };
      setMessages([...messages, newMessage]);
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chat-body">
      <div className="chat-header">
        <h1>Chat Room</h1>
      </div>

      <div className="username-input">
        <label htmlFor="username">Your name:</label>
        <input
          id="username"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            <span className="chat-message-user">{msg.user}:</span>
            <span className="chat-message-text">{msg.text}</span>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

const ChatPage = () => {
  return (
    <div className="chat-page-container">
      <Sidebar />
      <ChatContent />
    </div>
  );
};

export default ChatPage;
