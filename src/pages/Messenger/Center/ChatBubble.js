import React from "react";

const ChatBubble = ({ right, message, scrollRef }) => {
  return (
    <div id="message-container" className={`${right ? "chat-bubble-right" : "chat-bubble-left"}`} ref={scrollRef}>
      {right ? message.message.text : message.message.text}
    </div>
  );
};

export default ChatBubble;
