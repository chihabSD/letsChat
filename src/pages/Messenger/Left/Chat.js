import React from "react";
import { IMAGE_URL } from "../../../api/endpoint";

const Chat = ({ conversation, handleConversation, selectedConversation }) => {
  return (
    <div
      className={`${
        selectedConversation._id === conversation._id
          ? "chat select-chat"
          : "chat"
      }`}
      onClick={() => handleConversation(conversation)}
    >
      <div className="chat-left">
        <img src={`${IMAGE_URL}/11829passport.jpg`} />
      </div>
      <div className="chat-right">
        <div className="chat-right-top">
          <p>{/* {conversation.user.username} */}</p>
          <p>09:30</p>
        </div>
        <div className="chat-right-bottom">
          <p>
            DI :{conversation._id}
            {/* {conversation.latestMessage} */}
          </p>
          <p>99</p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
