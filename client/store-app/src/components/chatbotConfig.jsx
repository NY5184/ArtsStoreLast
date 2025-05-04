import { createChatBotMessage } from 'react-chatbot-kit';
import MyBotAvatar from './MyBotAvatar'; // ניצור את הקובץ הזה בשלב הבא

const config = {
  initialMessages: [
    createChatBotMessage("Hi! I'm ArtBot. Ask me about our paintings 🎨"),
  ],
  botName: "ArtBot",
  customComponents: {
    // קומפוננטה שמציגה את האווטר
    botAvatar: (props) => <MyBotAvatar {...props} />
  }
};

export default config;
