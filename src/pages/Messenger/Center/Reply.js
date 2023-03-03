import React from "react";
import { FaReply } from "react-icons/fa";
import { MessageTime } from "./MessageTime";
const Reply = ({_id,  handleCurrentMessageReply, message, direction }) => {
  return (
    <div
      className="message-content reply"
      onClick={() => handleCurrentMessageReply(message.messageId)}
    >
      <div className="replyInfo">
        <FaReply />{" "}
        {message.senderId._id && message.messageId.senderId === _id
          ? "Replied to yourself"
          : `You replied to message`}
      </div>
      <div className="parent-message">
        {" "}
        {message.messageId.type === "image"
          ? "Replied to image above"
          : message.messageId.message}
      </div>
      <div className="reply">
      
      <div>Settings </div>
        {message.message}
        <MessageTime date={message.createdAt} right={direction} reply />
      </div>
      <div>Settings </div>
    </div>
  );
};

export default Reply;
