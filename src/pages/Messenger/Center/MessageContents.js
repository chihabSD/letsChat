import React from "react";
import { MessageTime } from "./MessageTime";
const MessageContents = ({ message, direction }) => {
  return (
    <div className="message-content">
      {message.message.text}
      <MessageTime date={message.createdAt} right={direction} />
    </div>
  );
};

export default MessageContents;
