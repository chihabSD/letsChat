import React from "react";
import { useRedux } from "../../../hooks/useRedux";
import Chat from "./Chat";
import Group from "./Group";

const ChatList = () => {
  const { conversations } = useRedux();
  return (
    <div className="chatList-container">
      {conversations.map((conversation) => {
        const users = conversation.members.map((user) => user);
        if (conversation.type === "group") {
          return (
            <Group
              users={users}
              conversation={conversation}
              key={conversation._id}
            />
          );
        }
        if (conversation.type === "private") {
          return (
            <Chat
              key={conversation._id}
              users={users}
              conversation={conversation}
            />
          );
        }
      })}
    </div>
  );
};

export default ChatList;
