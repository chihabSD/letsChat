import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useMain } from "../../hooks/useMainState";
import { useRedux } from "../../hooks/useRedux";
import MainLayOut from "../../Layouts/MainLayOut";
import MainLayoutLoading from "../../Layouts/MainLayoutLoading";

import { _getChatList } from "../../redux/actions/friends/getChatlist";
import { _getMessage } from "../../redux/actions/message/getMessage";
import { _sendImage } from "../../redux/actions/message/sendImage";
import { _sendMessage } from "../../redux/actions/message/sendMessage";
import { _closeEmojiBox, _toggleEmojiBox } from "../../redux/reducers/toggler";
import Center from "./Center";
import Left from "./Left";
import Right from "./Right";

const MessengerUI = () => {
  const scrollRef= useRef()
  
  // const emojiboxRef = useRef(null)
  const { dispatch, conversations, messages,  loading, account:{username, _id} } = useRedux();
  const [selectedConversation, setSelectedConversation] = useState(null);
  // const [message, setMessage] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const {message,setMessage , toggleEmojiBox } = useMain()
  const [filled, setFilled] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const [image, setImage] = useState(null);

  
  const handleImageUpload = event => {
    console.log(event.target.files[0]);
    const formData = new FormData()
  formData.append('image', event.target.files[0] )
  formData.append('upload_preset', 'messageImages' )
  try {
    
    // const data = axios.post('')
  } catch (error) {
    
  }

  }
  const handleConversation = (conversation) => {
    
    // prevent calling api every time user click on existing chat
    if(selectedConversation._id == conversation._id){
      return
    }
    setSelectedConversation(conversation);

    dispatch(_getMessage(conversation._id));
  };
  const handleSelectedUser = (user) => {
    setSelectedUser(user);
  };
  const handleMessageInput = (e) => {
    // console.log(e.target.value);
    setMessage(e.target.value);
  };
  const handleSendButton = (event) => {
    if(event.code === 'Enter'){
      const receiver = selectedConversation.users.find(user => user._id !== _id)
      dispatch(
        _sendMessage({
          // senderName,conversationId,  receiverId, message
          conversationId: selectedConversation._id,
          message,
          receiverId: receiver._id,
          senderName:username 
        })
      );
      setMessage('')
      if(toggleEmojiBox) dispatch(_closeEmojiBox())
      // dispatch(_closeEmojiBox())
      
    }

    
  };
  const handleSend = () => {
    const receiver = selectedConversation.users.find(user => user._id !== _id)
    dispatch(
      _sendMessage({
        // senderName,conversationId,  receiverId, message
        conversationId: selectedConversation._id,
        message,
        receiverId: receiver._id,
        senderName:username 
      })
    );
    setMessage('')
    if(toggleEmojiBox) dispatch(_closeEmojiBox())
    // dispatch(_closeEmojiBox())
    
  }
 
  const selectedEmoji = emoji => {
    setMessage( `${message}` + emoji.emoji)
  }
  // USE EFFECT
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
  
    useEffect(() => {
      if (filled < 100 && isRunning) {
        setTimeout(() => setFilled(prev => prev += 2), 50)
      }
    },[filled, isRunning])
    
    useEffect(() => {
    if(loading || selectedConversation === null || selectedConversation === undefined){
      setIsRunning(true)
    }
    }, [loading]);
    
    if(loading || selectedConversation === null || selectedConversation === undefined ){
      return (
        <MainLayoutLoading>
        <h3> Loading Chats </h3>
        <div className="progressbar">
			  <div style={{
				  height: "100%",
				  width: `${filled}%`,
				  backgroundColor: "#a66cff",
				  transition:"width 0.5s"
			  }}></div>
		  </div>
			  <div className="progressPercent">{ filled }%</div>
        {/* <button onClick={()=>setIsRunning(true)}>Run </button> */}
      </MainLayoutLoading>
      )
    }else {

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
      handleImageUpload={handleImageUpload}
      handleSend={handleSend}
      selectedEmoji={selectedEmoji}
      message={message}
        handleMessageInput={handleMessageInput}
        handleSelectedUser={handleSelectedUser}
        selectedUser={selectedUser}
        scrollRef={scrollRef}
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
    }
};

export default MessengerUI;
