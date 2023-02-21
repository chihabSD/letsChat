import React from "react";
import Chat from "./Chat";

const ChatList = ({
  conversations,
  handleConversation,
  selectedConversation,
}) => {
  return (
    <div className="chatList-container">
      {/* {conversations.map(conversation => <ul>
        <li>
          {conversation._id}

{conversation.users.map(user => <h1>{user.username}</h1>)}
        </li>
      </ul>)} */}

      {conversations.map((conversation) => {
        const users = conversation.users.map((user) => user);
        return (
          <Chat
            key={conversation._id}
            users={users}
            conversation={conversation}
            selectedConversation={selectedConversation}
            handleConversation={handleConversation}
          />
        );
      })}
      {/* {conversations.map((conversation) => (
        <Chat key={conversation._id}
          conversation={conversation}
          selectedConversation={selectedConversation}
          handleConversation={handleConversation}
        />
      ))} */}
    </div>
  );
};

export default ChatList;
