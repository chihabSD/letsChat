import React from "react";
import { useRedux } from "../../../hooks/useRedux";
import { _getMessage } from "../../../redux/actions/message/getMessage";
import { handleCurrentConversation } from "../../../redux/reducers/friends";

const Group = ({ conversation, users }) => {
  const {
    loading,
    conversations,
    selectedConversation,
    dispatch,
    messages,
    account: { _id },
  } = useRedux();

  const handleConversation = () => {
    if (selectedConversation && selectedConversation._id === conversation._id) {
      console.log("group chat already exist");
      return;
    } else {
      dispatch(_getMessage(conversation._id));
      dispatch(handleCurrentConversation(conversation));
      // console.log( conversation);
    }

  };
  const userFound = conversation.members.find((user) => user._id !== _id);
  let condition = conversation.latestMessage
    ? conversation.latestMessage.message
    : "Conversation not started yet ";
  return (
    <div>
      <div
        className={`${
          selectedConversation && selectedConversation._id === conversation._id
            ? "chat select-chat"
            : "chat"
        }`}
        onClick={() => handleConversation()}
      >
        <div className="chat-left group">
          <img src="./social-network.png" />
        </div>
        <div className="chat-right">
          <div className="chat-right-top">
            <h4>
              {" "}
              {conversation.groupName
                ? conversation.groupName
                : "No group name yet"}{" "}
            </h4>
            <div>99</div>
          </div>
          <div className="chat-right-bottom">
            <p>{condition}</p>
            <p>99</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Group;
