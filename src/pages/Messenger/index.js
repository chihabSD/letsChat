import React, { useEffect, useState } from "react";
import { useRedux } from "../../hooks/useRedux";
import MainLayOut from "../../Layouts/MainLayOut";
import { _getChatList } from "../../redux/actions/friends/getChatlist";
import Center from "./Center";
import Left from "./Left";
import Right from "./Right";

const MessengerUI = () => {
  const {dispatch, conversations}  =useRedux()
  const [selectedConversation, setSelectedConversation] = useState({ _id: '63f48f0dc752d51d7f362441',
    user: [{ _id: '63eff9959c1f57a35f545494', username: "fljsd adam" }, {_id:'63f29cf07b8dd771d5801944'}],
    message: { _id: 0, text: "Just a text " },
    latestMessage: "Hi there "});

    
  const [selectedUser, setSelectedUser] = useState(null);
  
  const [message, setMessage] = useState("");
  const users = [
    { id: '', name: "chihabslddine", email: "adam@gmail.com" },
    { id: 2, name: "Another user", email: "adam@gmail.com" },
  ];
  const chats = [
    {
      _id: 0,
      user: { _id: 0, username: "fljsd adam" },
      message: { _id: 0, text: "Just a text " },
      latestMessage: "Hi there ",
    },
    {
      _id: 1,
      user: { _id: 2, username: "chihabeddine adam" },
      message: { _id: 0, text: "second messge" },
      latestMessage: "Hi there ",
    },
  ];
  const handleConversation = (conversation) => {
    console.log((conversation));
    setSelectedConversation(conversation);
  };
  const handleSelectedUser = (user) => {
    setSelectedUser(user);
  };
  const handleMessageInput = (e) => {
    setMessage(e.target.value);
  };
  const handleSendButton = () => {
    chats.push({
      _id: 3,
      user: { _id: 3, username: "inserted" },
      message: { _id: 3, text: message ? message : "default message" },
      latestMessage: "Last message",
    });
    console.log(chats);
  };
  
  useEffect(() => {
    setSelectedConversation(conversations[0]);
  }, []);

  // Initialize current conversation
  // useEffect(() => {
  //   setSelectedChat(chats[0]);
  // }, []);
 
  useEffect(() => {
    dispatch(_getChatList())
  }, [])
  return (
    <MainLayOut>
      <Left
        handleSelectedUser={handleSelectedUser}
        handleConversation={handleConversation}
        conversations={conversations}
        selectedConversation={selectedConversation}
        selectedUser={selectedUser}
        users={users}
      />

      {/* <Center
        handleMessageInput={handleMessageInput}
        handleSelectedUser={handleSelectedUser}
        selectedUser={selectedUser}
        selectedChat={selectedChat}
        users={users}
        handleSendButton={handleSendButton}
      />

      <Right
        handleSelectedUser={handleSelectedUser}
        selectedUser={selectedUser}
        selectedChat={selectedChat}
        users={users}
      /> */}
    </MainLayOut>
  );
};

export default MessengerUI;
