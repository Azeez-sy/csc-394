import React, { useState, useEffect, useRef } from "react";
import "./styles/chats-page.css";
import Sidebar from "./components/sidebar";

const ChatContent = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // Add a ref for the messages container
  const messagesEndRef = useRef(null);

  // Add scrollToBottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchChatHistory = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/chat/messages/');
      if (response.ok) {
        const data = await response.json();
        // Reverse the messages array before setting it
        const sortedMessages = data.messages
          .map(msg => ({
            user: msg.username,
            text: msg.message
          }))
          .reverse();
        setMessages(sortedMessages);
      }
    } catch (error) {
      console.error('Failed to fetch chat history:', error);
    }
  };

  useEffect(() => {
    // Fetch chat history when component mounts
    fetchChatHistory();
    
    console.log("Attempting to connect to WebSocket...");
    const chatSocket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/`);

    chatSocket.onopen = () => {
      console.log("WebSocket connected successfully");
      setIsConnected(true);
    };

    chatSocket.onmessage = (event) => {
      console.log("Received message:", event.data);
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: data.username, text: data.message }
      ]);
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

  // Add useEffect to scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not open. Cannot send message.");
      return;
    }

    if (input.trim() !== "") {
      const messageData = { 
        message: input, 
        username: user.displayName  // Changed from user.name to user.displayName
      };
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

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            <span className="chat-message-user">{msg.user}:</span>
            <span className="chat-message-text">{msg.text}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
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

const ChatPage = ({ handleLogout, user }) => {
  return (
    <div className="chat-page-container">
      <Sidebar handleLogout={handleLogout} />
      <ChatContent user={user} />
    </div>
  );
};

export default ChatPage;
