import React from 'react';
import './chatbot.css';
import ChatBot from './ChatBot';

const ChatBotModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <>
      <div className="chatbot-overlay" onClick={onClose}></div>

      <div className="chatbot-modal">
        <div className="chatbot-header">
          <h3>Aryaman Assistant</h3>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <ChatBot />
      </div>
    </>
  );
};

export default ChatBotModal;
