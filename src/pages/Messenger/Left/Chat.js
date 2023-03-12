import React, { useContext, useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { UserImage } from "../../../components/UserImage";
import { useRedux } from "../../../hooks/useRedux";
import { _getMessage } from "../../../redux/actions/message/getMessage";
import { handleCurrentConversation } from "../../../redux/reducers/friends";

const Chat = ({ conversation }) => {
  const {
    dispatch,
    selectedConversation,
    activeUsers, 
    account: { _id },
  } = useRedux();
  const { latestMessage } = conversation;
  const [optionsVisible, setOptionsVisible] = useState();
  const options = ["Delete", "Edit"];
  const userFound = conversation.members.find(({ user }) => user._id !== _id);

  // const test = activeUsers.length > 0 ? activeUsers.map(user => user.userId) :"Of"
  const currentConversation =
    selectedConversation && selectedConversation._id === conversation._id;
  let isLatestMessage = latestMessage && latestMessage

  // console.log());
  // render last message
  let renderLastMessage = () => {
    if (isLatestMessage) {
      return latestMessage.type === "text" ? (
        <TextMessage msg={latestMessage.message} />
      ) : (
        <PhotoType />
      );
    } else {
      return "Conversation not started yet!";
    }
  };
  const handleConversation = () => {
    if (currentConversation) {
      return;
    } else {
      dispatch(_getMessage(conversation._id));
      dispatch(handleCurrentConversation(conversation));
    }
  };

  const isOnline = activeUsers && activeUsers.length > 0 ? activeUsers.find(u => u.userId == userFound.user._id) : null
  return (
    <div
      className={`${currentConversation ? "chat select-chat" : "chat"}`}
      onClick={() => handleConversation()}
    >
      <div className="chat-left">
        <UserImage image={userFound.user.image} />
      </div>
      <div className="chat-right">
        <div className="chat-right-top">
          {/* <h4> {userFound.user.username} {activeUsers.length > 0 ? activeUsers.find(user => user.userId == userFound._id ? "Online":"Offline"):"Offline"} </h4> */}
          <h4> {userFound.user.username} {activeUsers.length > 0 ? isOnline ? "Online":null:null} </h4>
          <div>99</div>
        </div>
        <div className="chat-right-bottom">
          {renderLastMessage()}
          <BsChevronDown />
        </div>
      </div>
    </div>
  );
};

export default Chat;
const PhotoType = () => {
  return <p>Phot </p>;
};
const TextMessage = ({ msg }) => {
  return <p>{msg}</p>;
};
