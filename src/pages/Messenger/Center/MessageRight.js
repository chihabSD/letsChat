import React from "react";
import { MessageTime } from "./MessageTime";

const MessageRight = ({ message, scrollRef  }) => {
  return (
    <div className="message-container right" ref={scrollRef }>
      <div className="top">
        <div className="message-contents">
          <p> {message.message.text}</p>
        </div>
      </div>

      <MessageTime />
    </div>
  );
};

export default MessageRight;
