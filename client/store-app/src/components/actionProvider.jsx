// const ActionProvider = ({ createChatBotMessage, setState, children }) => {
//   const updateState = (message) => {
//     setState((prev) => ({
//       ...prev,
//       messages: [...prev.messages, message],
//     }));
//   };

//   const handleGreeting = () => {
//     const msg = createChatBotMessage("Hello! Welcome to our art store 🎨");
//     updateState(msg);
//   };

//   const handleBotName = () => {
//     const msg = createChatBotMessage("My name is ArtBot, your painting assistant.");
//     updateState(msg);
//   };

//   const handleShowPaintings = () => {
//     const msg = createChatBotMessage("We have landscape, abstract, and portrait paintings. What are you interested in?");
//     updateState(msg);
//   };

//   const handleShowPrices = () => {
//     const msg = createChatBotMessage("Prices range from $50 to $500 depending on the painting.");
//     updateState(msg);
//   };

//   const handleBuyInfo = () => {
//     const msg = createChatBotMessage("You can buy a painting by contacting us or visiting the product page.");
//     updateState(msg);
//   };

//   const handleUnknown = () => {
//     const msg = createChatBotMessage("I'm not sure how to answer that. Can you try rephrasing?");
//     updateState(msg);
//   };

//   return children({
//     handleGreeting,
//     handleBotName,
//     handleShowPaintings,
//     handleShowPrices,
//     handleBuyInfo,
//     handleUnknown,
//   });
// };

// export default ActionProvider;
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  updateState(message) {
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }

  handleGreeting = () => {
    const msg = this.createChatBotMessage("Hello! Welcome to our art store 🎨");
    this.updateState(msg);
  };

  handleBotName = () => {
    const msg = this.createChatBotMessage("My name is ArtBot, your painting assistant.");
    this.updateState(msg);
  };

  handleShowPaintings = () => {
    const msg = this.createChatBotMessage("We have landscape, abstract, and portrait paintings. What are you interested in?");
    this.updateState(msg);
  };

  handleShowPrices = () => {
    const msg = this.createChatBotMessage("Prices range from $50 to $500 depending on the painting.");
    this.updateState(msg);
  };

  handleBuyInfo = () => {
    const msg = this.createChatBotMessage("You can buy a painting by contacting us or visiting the product page.");
    this.updateState(msg);
  };

  handleUnknown = () => {
    const msg = this.createChatBotMessage("I'm not sure how to answer that. Can you try rephrasing?");
    this.updateState(msg);
  };
  handleHelp = () => {
    const msg = this.createChatBotMessage("How can I assist you today?");
    this.updateState(msg);
  };
  handleThankYou = () => {
    const msg = this.createChatBotMessage("You're welcome! If you have any more questions, feel free to ask.");
    this.updateState(msg);
  };
  handleGoodbye = () => {
    const msg = this.createChatBotMessage("Goodbye! Have a great day! 🌞");
    this.updateState(msg);
  };
  handleContactInfo = () => {
    const msg = this.createChatBotMessage("You can contact us at  ")
  };
  handleLocationInfo = () => {
    const msg = this.createChatBotMessage("We are located at 123 Art Street, Art City.");
    this.updateState(msg);
  };
  handleHoursInfo = () => {
    const msg = this.createChatBotMessage("We are open from 9 AM to 6 PM, Monday to Saturday.");
    this.updateState(msg);
  };
  handleFeedbackRequest = () => {
    const msg = this.createChatBotMessage("We value your feedback! Please let us know how we can improve.");
    this.updateState(msg);
  };
  handleSupportRequest = () => {
    const msg = this.createChatBotMessage("If you need support, please contact our support team at  057688888.");
};
handleReturnPolicy= () => {
    const msg = this.createChatBotMessage("Our return policy allows returns within 30 days of purchase. Please keep the receipt.");
    this.updateState(msg);
  };
  handleShippingInfo = () => {
    const msg = this.createChatBotMessage("We offer free shipping on orders over $100. Standard shipping takes 5-7 business days.");
    this.updateState(msg);
  };
 
  };
 



export default ActionProvider;
