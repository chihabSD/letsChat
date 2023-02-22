import React, { useEffect, useRef } from "react";
import { Oval } from "react-loader-spinner";
import { useRedux } from "../../../hooks/useRedux";
import { _getFriends } from "../../../redux/actions/friends/getFriends";
import ChatBubble from "./ChatBubble";
import MessageBox from "./MessageBox";
import MessagesLoader from "./MessagesLoader";

const Center = ({
  handleSendButton,
  selectedConversation,
  scrollRef,
  handleMessageInput,

  handleToggleRight,
}) => {
  // const scrollRef = useRef()
  const {
    loading,
    messages,
    account: { _id },
  } = useRedux();
  const notReady = loading || selectedConversation == null;
  return (
    <div className="center">
      <div className="chat-header">
        {notReady
          ? "Not ready"
          : selectedConversation.users.map((user) => {
              if (user._id !== _id) return user.username;
            })}
      </div>

      <div className="messages-container">
        {notReady ? (
          <MessagesLoader />
        ) : messages.length === 0 || messages === undefined ? (
          <h1>No message yet </h1>
        ) : (
          messages.map((message) =>
            message.senderId._id === _id ||
            message.senderId._id === undefined ? (
              <ChatBubble scrollRef={scrollRef} right message={message} />
            ) : (
              <ChatBubble scrollRef={scrollRef} message={message} />
            )
          )
        )}
      </div>
      <MessageBox
        handleMessageInput={handleMessageInput}
        handleSendButton={handleSendButton}
      />
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
