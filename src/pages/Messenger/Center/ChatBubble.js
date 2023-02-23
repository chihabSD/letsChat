import React from "react";
import { IMAGE_URL } from "../../../api/endpoint";

const ChatBubble = ({ right, message, scrollRef }) => {
  console.log(message);
  return (
    <div
      className={`${right ? "chat-bubble" : "chat-bubble-left"}`}
      ref={scrollRef}
    >
      {!right && (
        <div className="receiver-image">
          <img src={`${IMAGE_URL}/${message.senderId.image}`} />
        </div>
      )}
      <div className="message-contents">
        <p>{right ? message.message.text : message.message.text}</p>
      </div>
    </div>
    // <div className="bubble-container">

    // </div>
  );
};

export default ChatBubble;
