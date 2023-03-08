import React from "react";

import ChatList from "./ChatList";
import LeftHeader from "./LeftHeader";
import SearchFriendBox from "./SearchFriendBox";

const Left = () => {

  return (
    <div className="leftside">
      <LeftHeader />
      <SearchFriendBox />
      <ChatList />
     
    </div>
  );
};

export default Left;
