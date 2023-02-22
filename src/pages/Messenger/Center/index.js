import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineExpand } from "react-icons/ai";
import { FaExpand, FaExpandAlt, FaWindowClose } from "react-icons/fa";
import { Oval } from "react-loader-spinner";
import { emojis } from "../../../data";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useMain } from "../../../hooks/useMainState";
import { useRedux } from "../../../hooks/useRedux";
import { _getFriends } from "../../../redux/actions/friends/getFriends";
import {  _toggleEmojiBox, _toggleRightSide } from "../../../redux/reducers/toggler";
import ChatBubble from "./ChatBubble";
import EmojiBox from "./EmojiBox";
import MessageBox from "./MessageBox";
import MessagesLoader from "./MessagesLoader";
const Center = ({
  handleSendButton,
  selectedConversation,
  scrollRef,
  handleMessageInput,
  message,
}) => {
 const {showEmojiBox, toggleEmojiBox,  handleOutsideClick,ref } =  useMain()
  useClickOutside(ref, () => {
    dispatch(_toggleEmojiBox())
  })
  
  const {
    loading,
    messages,
    rightSideToggled, 
    dispatch,
    emojiBoxyToggled, 
    account: { _id },
  } = useRedux();
  const notReady = loading || selectedConversation == null;
  return (
    <div className="center">
      {/* {showEmojiBox  && <EmojiBox />} */}
      <div className="chat-header">
        {notReady
          ? "Not ready"
          : selectedConversation.users.map((user) => {
              if (user._id !== _id) return user.username;
            })}
        <div className="chat-header-right">
          <div onClick={()=> dispatch(_toggleRightSide())}>
            {rightSideToggled ? (
              <AiOutlineClose size={25} />
            ) : (
              <AiOutlineExpand fontSize={30} />
            )}
          </div>
        </div>
      </div>

      <div className="messages-container">
        {/* {emojis.map(emoji => <div>{emoji}</div>)} */}
        {/* <EmojiBox /> */}
        {notReady ? (
          <MessagesLoader />
        ) : messages.length === 0 || messages === undefined ? (
          <h1>No message yet </h1>
        ) : (
          messages.map((message) =>
            message.senderId._id === _id ||
            message.senderId._id === undefined ? (
              <ChatBubble
                key={message._id}
                scrollRef={scrollRef}
                right
                message={message}
              />
            ) : (
              <ChatBubble
                key={message._id}
                scrollRef={scrollRef}
                message={message}
              />
            )
          )
        )}
      </div>

      <MessageBox
    
        message={message}
        handleMessageInput={handleMessageInput}
        handleSendButton={handleSendButton}
      >
        {emojiBoxyToggled && <EmojiBox el={ref} />}
      </MessageBox>
    </div>
  );
  // if (!loading || selectedConversation !== null) {
  //   return <div>Loading</div>;
  // } else {
  //   const userFound = selectedConversation.users.find(
  //     (user) => user._id !== _id
  //   );
  //   return (
  //     <div className="center" id="message-container">
  //       <div className="chat-header">
  //         {selectedConversation.users.map((user) => {
  //           if (user._id !== _id) return user.username;
  //         })}

  //         <p onClick={handleToggleRight}>Toggle</p>
  //       </div>
  //       <div className="messages-container">
  //         {messages.length === 0 || messages === undefined ? (
  //           <h1>No message yet </h1>
  //         ) : (
  //           messages.map((message) =>
  //             message.senderId._id === _id ||
  //             message.senderId._id === undefined ? (
  //               <ChatBubble scrollRef={scrollRef} right message={message} />
  //             ) : (
  //               <ChatBubble scrollRef={scrollRef} message={message} />
  //             )
  //           )
  //         )}
  //       </div>
  //       <MessageBox
  //         handleMessageInput={handleMessageInput}
  //         handleSendButton={handleSendButton}
  //       />
  //     </div>
  //   );
  // }
};

export default Center;
