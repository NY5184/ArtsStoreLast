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
}

export default ActionProvider;
