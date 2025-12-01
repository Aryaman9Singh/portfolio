import React from 'react';
import './chatbot.css';

const ChatBotButton = ({ onClick }) => {
  return (
    <div className="chatbot-button" onClick={onClick}>
      💬
    </div>
  );
};

export default ChatBotButton;
