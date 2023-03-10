import React, { useContext } from "react";
import { ConversationContext } from "../../../contexts";
import NewConversation from "../../../Modals/NewConversation";
import NewGroup from "../../../Modals/NewGroup";

import ChatList from "./ChatList";
import LeftHeader from "./LeftHeader";
import SearchFriendBox from "./SearchFriendBox";

const Left = () => {
  const { newConversationVisible, newGroup } = useContext(ConversationContext);
  return (
    <>
      {newConversationVisible && <NewConversation />}
      {newGroup && <NewGroup />}
      <div className="leftside">
        <LeftHeader />
        <SearchFriendBox />
        <ChatList />
      </div>
    </>
  );
};

export default Left;
