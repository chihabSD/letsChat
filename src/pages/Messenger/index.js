import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { ConversationContext } from "../../contexts";

import { useMain } from "../../hooks/useMainState";
import { useRedux } from "../../hooks/useRedux";
import MainLayOut from "../../Layouts/MainLayOut";
import { _getChatList } from "../../redux/actions/friends/getChatlist";
import { _getMessage } from "../../redux/actions/message/getMessage";
import { _replyToMessage } from "../../redux/actions/message/replyToMessage";
import { _sendMessage } from "../../redux/actions/message/sendMessage";
import { _closeEmojiBox, _toggleEmojiBox } from "../../redux/reducers/toggler";
import Center from "./Center";
import Left from "./Left";
import PreLoading from "./PreLoading";
import Right from "./Right";
import NoConversation from "./NoConversation";
import NoSelectedChat from "./NoSelectedChat";
import { useModal } from "../../hooks";
import io from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";
// const socket = io.connect(SOCKET_URL)

// const io = require("socket.io-client");
// const socket = io(SOCKET_URL, {
//   withCredentials: true,
//   extraHeaders: {
//     "my-custom-header": "abcd"
//   }
// });

// var socket, selectedConversationCompare
const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`;
const MessengerUI = () => {
  const [isConnected, setIsConnected] = useState(false);
  const socket = useRef();
  const {
    filled,
    message,
    handleMessageInput,
    isReply,
    replyTo,
    setReplyTo,
    setReply,
    scrollRef,
    toggleIsReply,
    setMessage,
    toggleEmojiBox,
    toggleRightSide,
    rightSideToggled,
    selectedEmoji,
  } = useMain();
  const {
    toggleNewConversation,
    newConversationVisible,
    toggleNewGroup,
    newGroup,
  } = useModal();
  const {
    dispatch,
    conversations,
    loadingConversation,
    selectedConversation,

    account,
  } = useRedux();

  const handleSelectedReply = (msg) => {
    setReplyTo(msg);
    setReply(true);
  };

  const instance = axios.create();
  instance.defaults.headers.common = {};

  // Handle message upload
  const handleImageUpload = async (event) => {
    const formData = new FormData();

    formData.append("file", event.target.files[0]);
    formData.append("upload_preset", "doodo2023");
    try {
      const data = await instance.post(url, formData);
      // setImageUploading(true);

      const receivers = selectedConversation.members.filter(
        ({ user }) => user._id !== account._id
      );
      dispatch(
        _sendMessage({
          type: "image",
          conversationsType: selectedConversation.type,
          conversationId: selectedConversation._id,
          receivers,
          imageUrl: data.data.url,
        })
      );

      setReply(false);
      setReplyTo(null);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // The reply data
  const replayData = {
    messageId: replyTo && replyTo._id,
    message,
    conversationId: selectedConversation && selectedConversation._id,
  };

  // handle message submission
  const handleMessageSubmission = () => {
    const receivers = selectedConversation.members.filter(
      ({ user }) => user._id !== account._id
    );

    dispatch(
      _sendMessage({
        conversationsType: selectedConversation.type,
        conversationId: selectedConversation._id,
        message,
        receivers,
      })
    );
    setMessage("");

    setReply(false);
    setReplyTo(null);
    if (toggleEmojiBox) dispatch(_closeEmojiBox());
  };

  // handle reply submission
  const handleReplySumission = () => {
    dispatch(_replyToMessage(replayData));
    setReply(false);
    setReplyTo(null);
    setMessage("");
  };

  // when enter is pressed
  const handleSendButton = (event) => {
    if (event.code === "Enter" && isReply) {
      handleReplySumission();
      return;
    }
    if (event.code === "Enter" && !isReply) {
      handleMessageSubmission();
    }
  };

  // when the send is pressed
  const handleSend = () => {
    if (isReply) {
      handleReplySumission();
      return;
    }
    handleMessageSubmission();
  };

  // prevent from calling list twice
  var ranonce = false;
  useEffect(() => {
    if (!ranonce) {
      console.log("useEffect in index ranonce is called");
      dispatch(_getChatList());
      ranonce = true;
    }
  }, []);

  // import {io}  from "socket.io-client";

  useEffect(() => {
    if (!socket.current) {
      socket.current = io.connect(SOCKET_URL);
      setIsConnected(true);
    }

    // ... other codes
  }, []);

  useEffect(() => {
    if (isConnected) {
      socket.current.emit("connectUser", { user: account });
    }
  }, [isConnected]);


  

  if (loadingConversation) {
    return <PreLoading filled={filled} />;
  }

  // if there are no conversations for this user, display no conversation container
  if (conversations.length == 0) {
    return <NoConversation />;
  }
  // display conversations and rest of contents
  return (
    <ConversationContext.Provider
      value={{
        handleMessageInput,
        message,
        handleSend,
        handleSendButton,
        selectedEmoji,
        handleImageUpload,
        handleSelectedReply,
        replyTo,
        toggleIsReply,
        scrollRef,
        isReply,
        setReplyTo,
        toggleRightSide,
        rightSideToggled,
        toggleNewConversation,
        newConversationVisible,
        toggleNewGroup,
        newGroup,
      }}
    >
      <MainLayOut rightSideToggled={rightSideToggled}>
        <Left />
        {/* IF NO CONVERSATION SELECTED */}
        <div>{isConnected ? "Connected" : "Not connected"}</div>
        {selectedConversation === null ? (
          <NoSelectedChat />
        ) : (
          <>
            <Center />
            <Right />
          </>
        )}
      </MainLayOut>
    </ConversationContext.Provider>
  );
};

export default MessengerUI;
