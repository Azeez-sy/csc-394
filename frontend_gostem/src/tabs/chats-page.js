import React, { useState, useEffect, useRef } from "react";
import "./styles/chats-page.css";
import Sidebar from "./components/sidebar";

const ChatContent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userName, setUserName] = useState("Anonymous");
  const socketRef = useRef(null);

  // Fetch the user's profile name
  useEffect(() => {
    fetch("/api/profile/")
      .then((response) => response.json())
      .then((data) => setUserName(data.name || "Anonymous"))
      .catch(() => setUserName("Anonymous"));
  }, []);

  // WebSocket connection setup
  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:8000/ws/chats-page");

    socketRef.current.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    socketRef.current.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: messageData.sender, text: messageData.content }
      ]);
    };

    socketRef.current.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    // Clean up WebSocket connection when the component unmounts
    return () => {
      socketRef.current.close();
    };
  }, []);

  // Send message over WebSocket
  const handleSend = () => {
    if (input.trim() !== "") {
      const message = {
        content: input,
      };

      // Send the message to the server
      socketRef.current.send(JSON.stringify(message));

      // Optimistically add the new message to the UI
      setMessages([
        ...messages,
        { user: userName, text: input },
      ]);
      setInput(""); // Clear the input field
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
          disabled
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
