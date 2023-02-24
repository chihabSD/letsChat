import React from "react";
import { FaCheckDouble } from "react-icons/fa";
import { UserImage } from "../../../components/UserImage";
import MessageSetting from "./MessageSetting";
import { MessageTime } from "./MessageTime";

export const MessageLeft = ({ message, scrollRef }) => {
  return (
    <div className="message-container left" ref={scrollRef}>
      <div className="userimage-container">
        <UserImage
          image={message.receiverId.image}
          style={{ width: "40px", height: "40px" }}
        />
      </div>
      <div className="message">
        {" "}
        <p> {message.message.text}</p>{" "}
      </div>
      <MessageSetting />
      {/* <div className="message-contents">
        <div>
          <UserImage
            image={message.receiverId.image}
            style={{ width: "40px", height: "40px" }}
          />
        </div>
        <div className="message">
          <p> {message.message.text}</p>
          <div className="message-time">
            <div className="time">
              <p>
                <p>10:04 AM</p>
              </p>
            </div>
            <FaCheckDouble color="white" />
          </div>
        </div>

       
      </div> */}
    </div>
  );
};
