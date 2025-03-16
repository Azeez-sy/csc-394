import React, { useState, useEffect } from "react";
import "./styles/chats-page.css";
import Sidebar from "./components/sidebar";

const ChatContent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userName, setUserName] = useState("Anonymous");
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    console.log("Attempting to connect to WebSocket...");
    const chatSocket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/`);

    chatSocket.onopen = () => {
      console.log("WebSocket connected successfully");
      setIsConnected(true);
    };

    chatSocket.onmessage = (event) => {
      console.log("Received message:", event.data);
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, { user: data.username, text: data.message }]);
    };

    chatSocket.onclose = (event) => {
      console.error("WebSocket disconnected:", event.code, event.reason);
      setIsConnected(false);
    };

    chatSocket.onerror = (error) => {
      console.error("WebSocket Error:", error);
      setIsConnected(false);
    };

    setSocket(chatSocket);

    return () => {
      console.log("Cleaning up WebSocket connection");
      chatSocket.close();
    };
  }, []);

  const handleSend = () => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not open. Cannot send message.");
      return;
    }

    if (input.trim() !== "") {
      const messageData = { message: input, username: userName };
      socket.send(JSON.stringify(messageData));
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
        <h1>Chat Room {isConnected ? "🟢" : "🔴"}</h1>
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
          disabled={!isConnected}
        />
        <button onClick={handleSend} disabled={!isConnected}>Send</button>
      </div>
    </div>
  );
};

const ChatPage = ({ handleLogout }) => {
  return (
    <div className="chat-page-container">
      <Sidebar handleLogout={handleLogout} />
      <ChatContent />
    </div>
  );
};

export default ChatPage;
