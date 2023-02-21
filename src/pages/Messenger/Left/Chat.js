import React from "react";
import { IMAGE_URL } from "../../../api/endpoint";
import { useRedux } from "../../../hooks/useRedux";

const Chat = ({ conversation, handleConversation, selectedConversation }) => {
 const {loading, conversations} = useRedux()
  if(loading || conversations == undefined || conversation == null) {
    return <h1>Loading</h1>
  }
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
          <p>09:30</p>
        </div>
        <div className="chat-right-bottom">
          <p>
            DI :{conversation._id}
          </p>
          <p>99</p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
