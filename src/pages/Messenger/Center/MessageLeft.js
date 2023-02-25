import React from "react";
import { UserImage } from "../../../components/UserImage";
import MessageSetting from "./MessageSetting";
import { MessageTime } from "./MessageTime";

export const MessageLeft = ({ message, scrollRef }) => {
  return (
    <div className="message-bubble left" ref={scrollRef}>
      <div className="userimage-container">
        <UserImage
          image={message.receiverId.image}
          style={{ width: "40px", height: "40px" }}
        />
      </div>

      {/* END OF USER IAMGE */}
      <div className="message">
        <p> {message.message.text}</p>{" "}
        <MessageTime  date={message.createdAt}/>
      </div>
      {/* END OF MESSAGE  */}
      <MessageSetting />
    </div>
    
  );
};
