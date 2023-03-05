import React from "react";
import { IMAGE_URL } from "../../../api/endpoint";
import { useRedux } from "../../../hooks/useRedux";

const Group = ({
  conversation,
  users,
  handleConversation,
  selectedConversation,
}) => {
  const {
    loading,
    conversations,
    messages,
    account: { _id },
  } = useRedux();

  const userFound = conversation.users.find((user) => user._id !== _id);
  let condition = conversation.latestMessage
    ? conversation.latestMessage.message
    : "Conversation not started yet ";
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
            <h4> {conversation.groupName ? conversation.groupName:'No group name yet'} </h4>
            <div>99</div>
          </div>
          <div className="chat-right-bottom">
            <p>
              {condition}
   
            </p>
            <p>99</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Group;
