import React from "react";
import { MessageTime } from "./MessageTime";
const MessageContents = ({ message:{message, type, imageUrl, createdAt}, direction, handleImagePreview }) => {
  return (
    <div className="message-content">
      {type === "text" && message}
      {type === "image" && (
        <div className="message-image" onClick={() => handleImagePreview(imageUrl)}>
          <img src={imageUrl} />
        </div>
      )}
      <MessageTime date={createdAt} right={direction} />
    </div>
  );
};

export default MessageContents;
