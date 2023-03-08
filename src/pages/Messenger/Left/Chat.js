import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { IMAGE_URL } from "../../../api/endpoint";
import { UserImage } from "../../../components/UserImage";
import { useRedux } from "../../../hooks/useRedux";
import { _getMessage } from "../../../redux/actions/message/getMessage";
import { handleCurrentConversation } from "../../../redux/reducers/friends";

const Chat = ({ conversation }) => {
  const {
    loading,
    dispatch,
    conversations,
    selectedConversation,
    messages,
    account: { _id },
  } = useRedux();

  const [optionsVisible, setOptionsVisible] = useState();
  const options = ["Delete", "Edit"];
  const userFound = conversation.members.find(({ user }) => user._id !== _id);
  let condition = conversation.latestMessage
    ? conversation.latestMessage.message
    : "Conversation not started yet ";

  const handleConversation = () => {
    if (selectedConversation && selectedConversation._id === conversation._id) {
      console.log("Private chat already exist");
      return;
    } else {
      dispatch(_getMessage(conversation._id));
      dispatch(handleCurrentConversation(conversation));
      // console.log( conversation);
    }
  };
  return (
    <div
      className={`${
        selectedConversation && selectedConversation._id === conversation._id
          ? "chat select-chat"
          : "chat"
      }`}
      onClick={() => handleConversation()}
      // onClick={() => dispatch(handleCurrentConversation(conversation))}
    >
      <div className="chat-left">
        <UserImage image={userFound.user.image} />
      </div>
      <div className="chat-right">
        <div className="chat-right-top">
          <h4> {userFound.user.username} </h4>
          <div>99</div>
        </div>
        <div className="chat-right-bottom">
          <p>{condition}</p>
          <BsChevronDown />
        </div>
      </div>
    </div>
  );
};

export default Chat;
