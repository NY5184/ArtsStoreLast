import React from 'react';
import { Chatbot } from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';

import config from './chatbotConfig';
import MessageParser from './messageParser';
import ActionProvider from './actionProvider';

const ChatbotComponent = () => {
  return (
    <div style={{ position: 'absolute', bottom: 20, right: 20 }}>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
};

export default ChatbotComponent;
