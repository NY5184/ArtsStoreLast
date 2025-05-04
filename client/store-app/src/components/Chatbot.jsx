import React, { useState } from 'react';
import { Chatbot, createChatBotMessage } from 'react-chatbot-kit'; 
import 'react-chatbot-kit/build/main.css';
import config from './chatbotConfig';
import MessageParser from './messageParser';
import ActionProvider from './actionProvider';

const ChatbotComponent = () => {
  const [isOpen, setIsOpen] = useState(false);  // מצב פתיחה/סגירה של הבוט
  const [userInput, setUserInput] = useState(''); // זיכרון עבור תיבת הקלט
  const [messages, setMessages] = useState([]); // רשימה של הודעות הצ'אט

  // פונקציה לפתיחת וסגירת הצ'אט
  const toggleChatbot = () => {
    setIsOpen(!isOpen);  // שינוי מצב פתיחה/סגירה
  };

  // פונקציה לסגירת הצ'אט
  const closeChatbot = () => {
    setIsOpen(false);  // סגירת הבוט
  };

  // פונקציה שמעדכנת את הקלט של המשתמש
  const handleInputChange = (event) => {
    setUserInput(event.target.value); // עדכון תיבת הקלט
  };

  // פונקציה ששולחת את ההודעה לצ'אט-בוט
  const handleSendMessage = () => {
    if (userInput.trim()) {
      // יצירת הודעה חדשה בצ'אט
      const userMessage = createChatBotMessage(userInput); 
      setMessages((prevMessages) => [...prevMessages, userMessage]); // הוספת הודעת המשתמש

      setUserInput(''); // לנקות את תיבת הקלט אחרי שליחה

      // יצירת הודעת תשובה מהבוט
      const botResponse = createChatBotMessage("תשובה אוטומטית"); // תשובה דוגמתית מהבוט
      setMessages((prevMessages) => [...prevMessages, botResponse]); // הוספת תשובת הבוט
    }
  };

  return (
    <>
      <nav>
        <button onClick={toggleChatbot} style={buttonStyle}>Open Chatbot</button>
      </nav>

      {isOpen && (
        <div style={chatbotContainerStyle}>
          <div style={closeButtonStyle} onClick={closeChatbot}>X</div>
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
          <div style={chatContainerStyle}>
            {messages.map((msg, index) => (
              <div key={index} style={messageStyle}>
                {msg.message}
              </div>
            ))}
          </div>
          <div style={inputContainerStyle}>
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              placeholder="Ask me anything..."
              style={inputStyle}
            />
            <button onClick={handleSendMessage} style={sendButtonStyle}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

// עיצוב כפתור הפתיחה של הצ'אט
const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007BFF',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

// עיצוב המיכל שמכיל את הצ'אט
const chatbotContainerStyle = {
  position: 'fixed',
  bottom: 20,
  right: 20,
  width: '300px',
  height: '500px',
  backgroundColor: 'white',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  borderRadius: '8px',
  zIndex: 9999,
  padding: '10px',
};

// עיצוב כפתור הסגירה של הצ'אט
const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  fontSize: '20px',
  cursor: 'pointer',
  color: '#007BFF',
  zIndex: 10000,  // ודא שה-Z-index גבוה כדי שהכפתור יהיה מעל כל רכיב אחר
};

// עיצוב למסך הצ'אט
const chatContainerStyle = {
  overflowY: 'auto',
  height: '400px',
  marginBottom: '10px',
};

// עיצוב להודעות הצ'אט
const messageStyle = {
  padding: '10px',
  marginBottom: '10px',
  backgroundColor: '#f1f1f1',
  borderRadius: '5px',
  maxWidth: '80%',
};

// עיצוב לתיבת הקלט של המשתמש
const inputContainerStyle = {
  marginTop: '10px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
};

// עיצוב לתיבת הקלט
const inputStyle = {
  width: '70%',
  padding: '10px',
  marginRight: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

// עיצוב לכפתור השליחה
const sendButtonStyle = {
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  padding: '10px 15px',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default ChatbotComponent;
