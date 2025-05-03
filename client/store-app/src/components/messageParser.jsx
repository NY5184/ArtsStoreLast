// const MessageParser = ({ children, actions }) => {
//   const parse = (message) => {
//     const lower = message.toLowerCase();

//     if (lower.includes("hello") || lower.includes("hi")) {
//       actions.handleGreeting();
//     } else if (lower.includes("name")) {
//       actions.handleBotName();
//     } else if (lower.includes("painting") || lower.includes("paintings")) {
//       actions.handleShowPaintings();
//     } else if (lower.includes("price")) {
//       actions.handleShowPrices();
//     } else if (lower.includes("buy") || lower.includes("purchase")) {
//       actions.handleBuyInfo();
//     } else {
//       actions.handleUnknown();
//     }
//   };

//   return children({ parse });
// };

// export default MessageParser;
class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lower = message.toLowerCase();

    if (lower.includes("hello") || lower.includes("hi")) {
      this.actionProvider.handleGreeting();
    } else if (lower.includes("name")) {
      this.actionProvider.handleBotName();
    } else if (lower.includes("painting") || lower.includes("paintings")) {
      this.actionProvider.handleShowPaintings();
    } else if (lower.includes("price")) {
      this.actionProvider.handleShowPrices();
    } else if (lower.includes("buy") || lower.includes("purchase")) {
      this.actionProvider.handleBuyInfo();
    } else {
      this.actionProvider.handleUnknown();
    }
  }
}

export default MessageParser;
