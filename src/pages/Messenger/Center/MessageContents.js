import React from "react";
import { MessageTime } from "./MessageTime";
const MessageContents = ({ message, direction, handleImagePreview }) => {
  return (
    <div className="message-content">
      {message.type === "text" && message.message.text}
      {message.type === "image" && (
        <div className="message-image" onClick={() => handleImagePreview(message.imageUrl)}>
          <img src={message.imageUrl} />
        </div>
      )}
      <MessageTime date={message.createdAt} right={direction} />
    </div>
  );
};

export default MessageContents;
