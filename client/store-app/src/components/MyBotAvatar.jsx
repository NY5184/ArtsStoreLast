import React from 'react';

const MyBotAvatar = () => {
  return (
    <div className="react-chatbot-kit-chat-bot-avatar">
      <img
        src="/logo3.webp" // ודאי שהתמונה נמצאת בתוך public
        alt="Bot"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
        }}
      />
    </div>
  );
};

export default MyBotAvatar;
