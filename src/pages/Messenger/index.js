import React, { useEffect, useState } from "react";
import { useRedux } from "../../hooks/useRedux";
import MainLayOut from "../../Layouts/MainLayOut";
import { _getChatList } from "../../redux/actions/friends/getChatlist";
import { _getMessage } from "../../redux/actions/message/getMessage";
import { _sendImage } from "../../redux/actions/message/sendImage";
import { _sendMessage } from "../../redux/actions/message/sendMessage";
import Center from "./Center";
import Left from "./Left";
import Right from "./Right";

const MessengerUI = () => {
  const { dispatch, conversations, loading } = useRedux();
  const [selectedConversation, setSelectedConversation] = useState({
    _id: "63f48f0dc752d51d7f362441",
    user: [
      { _id: "63eff9959c1f57a35f545494", username: "fljsd adam" },
      { _id: "63f29cf07b8dd771d5801944" },
    ],
    message: { _id: 0, text: "Just a text " },
    latestMessage: "Hi there ",
  });

  const [selectedUser, setSelectedUser] = useState(null);

  const [message, setMessage] = useState("");

  const handleConversation = (conversation) => {
    setSelectedConversation(conversation);
  dispatch(_getMessage(conversation._id))
  };
  const handleSelectedUser = (user) => {
    setSelectedUser(user);
  };
  const handleMessageInput = (e) => {
    setMessage(e.target.value);
  };
  const handleSendButton = () => {
    // get conversation Id
    // insert message
    dispatch(
      _sendMessage({
        conversationId: selectedConversation._id,
        message,
        receiverId: "63f29cf07b8dd771d5801944",
        senderName: "chihabeddine",
      })
    );
  };

  // Initialize current conversation
  useEffect(() => {
    if(conversations.lenght > 0){

    setSelectedConversation(conversations[0]);
    dispatch(_getMessage(selectedConversation._id))
    }
  }, [conversations]);

  useEffect(() => {
    dispatch(_getChatList());
  }, []);
  return (
    <MainLayOut>
      <Left
        handleSelectedUser={handleSelectedUser}
        handleConversation={handleConversation}
        conversations={conversations}
        selectedConversation={selectedConversation}
        selectedUser={selectedUser}
      />


      <Center
        handleMessageInput={handleMessageInput}
        handleSelectedUser={handleSelectedUser}
        selectedUser={selectedUser}
        selectedConversation={selectedConversation}
        handleSendButton={handleSendButton}
      />

      <Right
        handleSelectedUser={handleSelectedUser}
        selectedUser={selectedUser}
        selectedConversation={selectedConversation}
      />
    </MainLayOut>
  );
};

export default MessengerUI;
