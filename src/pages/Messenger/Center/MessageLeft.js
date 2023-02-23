import React from "react";
import { UserImage } from "../../../components/UserImage";
import { MessageTime } from "./MessageTime";

export const MessageLeft = ({ message , scrollRef }) => {
  return (
    <div className="message-container left" ref={scrollRef }>
      <div className="top">
        <div>
          <UserImage image={message.receiverId.image} />
        </div>
        <div className="message-contents">
          <p> {message.message.text}</p>
        </div>
      </div>

      {/* <MessageTime /> */}
    </div>
  );
};
