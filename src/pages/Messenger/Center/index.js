import React, { useEffect } from "react";
import { useRedux } from "../../../hooks/useRedux";
import { _getFriends } from "../../../redux/actions/friends/getFriends";
import ChatBubble from "./ChatBubble";

const Center = ({
  handleSendButton,
  selectedConversation,
  handleMessageInput,
}) => {
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
        <div className="messages-container">
          {/* {selectedConversation.users.map(user => {
            if(user._id !== _id) return user.username
          })} */}

          {messages.length === 0 || messages === undefined ? (
            <h1>No message yet </h1>
          ) : (
            messages.map((message) => {
              if (message.senderId._id === _id) return <ChatBubble  />;

              return <ChatBubble right />;
            })
          )}
        </div>
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
    );
  }
};

export default Center;
