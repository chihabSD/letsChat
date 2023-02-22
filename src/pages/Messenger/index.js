import React, { useEffect, useRef, useState } from "react";
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
  const scrollRef= useRef()
  const scrollbottom = useRef()
  const { dispatch, conversations, messages,  loading, account:{username, _id} } = useRedux();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [toggleRight, setToggleRight] = useState(false);

  const [message, setMessage] = useState("");

  const handleToggleRight = () => {
    setToggleRight(prev => !prev)
  }
  const handleConversation = (conversation) => {
    setSelectedConversation(conversation);
    dispatch(_getMessage(conversation._id));
  };
  const handleSelectedUser = (user) => {
    setSelectedUser(user);
  };
  const handleMessageInput = (e) => {
    setMessage(e.target.value);
  };
  const handleSendButton = () => {
    const receiver = selectedConversation.users.find(user => user._id !== _id)
    // console.log(receiver._id);
    dispatch(
      _sendMessage({
        // senderName,conversationId,  receiverId, message
        conversationId: selectedConversation._id,
        message,
        receiverId: receiver._id,
        senderName:username 
      })
    );
  };
  useEffect(() => {
  window.setInterval(function() {
    var elem = document.getElementById('message-container');
    elem.scrollTop = elem.scrollHeight;
  }, 5000);
 
  }, [] )

  // Initialize current conversation
  useEffect(() => {
    if (conversations.length > 0) {
      setSelectedConversation(conversations[0]);
    }
  }, [conversations]);

    useEffect(() => {
    dispatch(_getChatList());
  }, []);

    useEffect(() => {
  scrollRef.current?.scrollIntoView({behavior:'smooth', block: "end"})
  }, [messages]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior:'smooth', block: "end"})
    }, []);
  return (
    <MainLayOut toggleRight={toggleRight}>
      <Left
        handleSelectedUser={handleSelectedUser}
        handleConversation={handleConversation}
        conversations={conversations}
        selectedConversation={selectedConversation}
        selectedUser={selectedUser}
      />

      <Center
      handleToggleRight ={handleToggleRight }
      toggleRight={toggleRight}
        handleMessageInput={handleMessageInput}
        handleSelectedUser={handleSelectedUser}
        selectedUser={selectedUser}
        scrollRef={scrollRef}
        selectedConversation={selectedConversation}
        handleSendButton={handleSendButton}
      />

      <Right
      handleToggleRight ={handleToggleRight }
      toggleRight={toggleRight}
        handleSelectedUser={handleSelectedUser}
        selectedUser={selectedUser}
        selectedConversation={selectedConversation}
      />
    </MainLayOut>
  );
};

export default MessengerUI;
