import React, { useEffect, useState } from "react";
import MainLayOut from "../../Layouts/MainLayOut";
import Center from "./Center";
import Left from "./Left";
import Right from "./Right";

const MessengerUI = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState({
    _id: 0,
    user: { _id: 0, username: "fljsd adam" },
    message: { _id: 0, text: "Just a text " },
    latestMessage: "Hi there ",
  });
  const [message, setMessage] = useState("");
  const users = [
    { id: 0, name: "chihabslddine", email: "adam@gmail.com" },
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
  const handleSelectedChat = (chat) => {
    setSelectedChat(chat);
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
    setSelectedChat(chats[0]);
  }, []);
  useEffect(() => {
    if(chats) {
      console.log('ssjl');
    }
  }, [chats])
  return (
    <MainLayOut>
      <Left
        handleSelectedUser={handleSelectedUser}
        handleSelectedChat={handleSelectedChat}
        selectedChat={selectedChat}
        selectedUser={selectedUser}
        users={users}
        chats={chats}
      />

      <Center
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
      />
    </MainLayOut>
  );
};

export default MessengerUI;
