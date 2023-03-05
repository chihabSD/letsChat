import React from "react";
import { useRedux } from "../../../hooks/useRedux";
import Chat from "./Chat";
import ChatsLoading from "./ChatsLoading";
import Group from "./Group";

const ChatList = ({
  // conversations,
  handleConversation,
  selectedConversation,
}) => {
  const {
    loading,
    conversations,
    account: { _id },
  } = useRedux();
  const isLoading = loading || conversations == undefined;
  return (
    <div className="chatList-container">
      {isLoading ? (
        <ChatsLoading />
      ) : (
        conversations.map((conversation) => {
          const users = conversation.users.map((user) => user);
          if (conversation.type === "group") {
            return (
              <Group
                users={users}
                conversation={conversation}
                key={conversation._id}
                selectedConversation={selectedConversation}
                handleConversation={handleConversation}
              />
            );
          }
          if (conversation.type === "private") {
            return (
              <Chat
                key={conversation._id}
                users={users}
                conversation={conversation}
                selectedConversation={selectedConversation}
                handleConversation={handleConversation}
              />
            );
          }
          // conversation.type === 'group' ?  (<div>Group</div>):(<div>Private</div>)
        })
      )}
      {/* {loading || conversations == undefined ? <ChatsLoading />: conversations.map((conversation) => {
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
      })} */}
    </div>
  );
};

export default ChatList;
