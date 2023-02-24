import React from "react";
import { BsReply } from "react-icons/bs";
import { FaCheckDouble, FaSmile } from "react-icons/fa";
import { TbDotsVertical } from "react-icons/tb";
import MessageSetting from "./MessageSetting";
import { MessageTime } from "./MessageTime";

const MessageRight = ({ message, scrollRef }) => {
  return (
    <div className="message-container right" ref={scrollRef}>
      <div className="message-contents">
        <MessageSetting />
        <div className="message">
          <p> {message.message.text}</p>
          <div className="message-time">
            <div className="time"><p>
              <p>10:04 AM</p>
              </p></div>
          <FaCheckDouble  color="white"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageRight;
