import React from "react";
import { IMAGE_URL } from "../../../api/endpoint";
import { useRedux } from "../../../hooks/useRedux";

const Chat = ({ conversation,users,  handleConversation, selectedConversation }) => {
 const {loading, conversations, account:{_id}} = useRedux()
  
  const userFound = conversation.users.find(user => user._id !== _id);

  return (
    <div>

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
          <h4> {userFound.username}</h4>
        <div>99</div>
        </div>
        <div className="chat-right-bottom">
          <p>
           Latestest mess
          </p>
          <p>99</p>
        </div>
      </div>
    </div>
    </div>
  );
  
};

export default Chat;
