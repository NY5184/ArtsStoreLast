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
    } else if (lower.includes("help")) {
      this.actionProvider.handleHelp();
    }
    else if (lower.includes("thank you") || lower.includes("thanks")) {
      this.actionProvider.handleThankYou();
    } else if (lower.includes("bye") || lower.includes("goodbye")) {
      this.actionProvider.handleGoodbye();
    } else if (lower.includes("contact")) {
      this.actionProvider.handleContactInfo();
    } else if (lower.includes("location")) {
      this.actionProvider.handleLocationInfo();
    } else if (lower.includes("hours")) {
      this.actionProvider.handleHoursInfo();
    }
    else if (lower.includes("feedback")) {
      this.actionProvider.handleFeedbackRequest();
    } else if (lower.includes("support")) {
      this.actionProvider.handleSupportRequest();
    } else if (lower.includes("return") || lower.includes("refund")) {
      this.actionProvider.handleReturnPolicy();
    } else if (lower.includes("shipping") || lower.includes("delivery")) {
      this.actionProvider.handleShippingInfo();
    } else if (lower.includes("payment") || lower.includes("methods")) {
      this.actionProvider.handlePaymentMethods();
    } else if (lower.includes("warranty")) {
      this.actionProvider.handleWarrantyInfo();
    }


    
    else {
      this.actionProvider.handleUnknown();
    }
  }
}

export default MessageParser;
