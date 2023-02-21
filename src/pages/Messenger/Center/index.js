import React, { useEffect, useRef } from "react";
import { useRedux } from "../../../hooks/useRedux";
import { _getFriends } from "../../../redux/actions/friends/getFriends";
import ChatBubble from "./ChatBubble";

const Center = ({
  handleSendButton,
  selectedConversation,
  scrollRef, 
  handleMessageInput,
}) => {
  // const scrollRef = useRef()
  const {
    loading,
    messages, 
    account: { _id },
  } = useRedux();
  if (loading || selectedConversation === null) {
    return <div>Loading</div>;
  } else {
    const userFound = selectedConversation.users.find(
      (user) => user._id !== _id
    );
    return (
      <div className="center">
         {selectedConversation.users.map((user) => {
            if (user._id !== _id) return user.username;
          })}

          <hr />
        <div className="messages-container">
         

          {messages.length === 0 || messages === undefined ? (
            <h1>No message yet </h1>
          ) : (
            messages.map((message) =>
              message.senderId._id === _id ||
              message.senderId._id === undefined ? (
                <ChatBubble scrollRef={scrollRef} right message={message} />
              ) : (
                <ChatBubble scrollRef={scrollRef}  message={message} />
              )
            )
          )}
        </div>
        <div className="message-box-container">

        <div className="messages-send-box">
          <input
            type="text"
            placeholder="Enter something"
            name="message"
            onChange={handleMessageInput}
          />
          <button onClick={() => handleSendButton()}>Send </button>
        </div>
        </div>
      </div>
    );
  }
};

export default Center;
