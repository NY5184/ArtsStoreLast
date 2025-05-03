import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
  initialMessages: [
    createChatBotMessage("Hi! I'm ArtBot. Ask me about our paintings 🎨"),
  ],
  botName: "ArtBot",
};

export default config;
