import React, { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { UserImage } from "../../../components/UserImage";
import { useRedux } from "../../../hooks/useRedux";
import { _getMessage } from "../../../redux/actions/message/getMessage";
import { handleCurrentConversation } from "../../../redux/reducers/friends";

const Chat = ({ conversation }) => {
  const {
    dispatch,
    selectedConversation,
    account: { _id },
  } = useRedux();

  // const { latestMessage} = selectedConversation
  const [optionsVisible, setOptionsVisible] = useState();
  const [currentLatestMessage, setCurrentLatestMessage] = useState(
    conversation.latestMessage
  );

  const options = ["Delete", "Edit"];
  const userFound = conversation.members.find(({ user }) => user._id !== _id);

  const msg = "Conversation not started yet";
  const isCurrentConversation =
    selectedConversation && selectedConversation._id === conversation._id;

  // if active conversation, check if has latestest message and display it else dispay message
  // if not active, also check message and display it if it exists
  let renderLastMessage = () => {
    if (isCurrentConversation) {
      return currentLatestMessage
        ? currentLatestMessage.type === "text"
          ? currentLatestMessage.message
          : "Image"
        : msg;
    }

    return conversation.latestMessage && conversation.latestMessage
      ? conversation.type === "text"
        ? conversation.message
        : "Image"
      : msg;
  };
  const handleConversation = () => {
    if (isCurrentConversation) {
      console.log("Private chat already exist");
      return;
    } else {
      dispatch(_getMessage(conversation._id));
      dispatch(handleCurrentConversation(conversation));
    }
  };

  useEffect(() => {
    if (selectedConversation) {
      setCurrentLatestMessage(selectedConversation.latestMessage);
    }
  }, [selectedConversation]);
  return (
    <div
      className={`${isCurrentConversation ? "chat select-chat" : "chat"}`}
      onClick={() => handleConversation()}
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
          <p>{renderLastMessage()}</p>

          <BsChevronDown />
        </div>
      </div>
    </div>
  );
};

export default Chat;
