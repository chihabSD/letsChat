import React from "react";
import Chat from "./Chat";

const ChatList = ({
  conversations,
  handleConversation, 
  selectedConversation,
}) => {
  return (
    <div className="chatList-container">
      {conversations.map((conversation) => (
        <Chat key={conversation._id}
          conversation={conversation}
          selectedConversation={selectedConversation}
          handleConversation={handleConversation}
        />
      ))}
    </div>
  );
};

export default ChatList;
