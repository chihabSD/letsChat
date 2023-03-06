import React from "react";
import NoChat from "../../../components/NoChat";
import ActiveUsers from "./ActiveUsers";
import ChatList from "./ChatList";
import LeftHeader from "./LeftHeader";
import SearchFriendBox from "./SearchFriendBox";

const Left = ({
  users,
  conversations,
  handleSelectedUser,
  selectedUser,
  handleConversation, 
  selectedConversation,
}) => {
  return (
    <div className="leftside">
      {/* <LeftTop /> */}
      <LeftHeader />
      <SearchFriendBox />
      {/* <ActiveUsers /> */}
      <ChatList conversations={conversations} handleConversation={handleConversation} selectedConversation={selectedConversation}/>
     
      {/* <NoChat /> */}
      {/* <ul>
        {users.map(user => <li onClick={() => handleSelectedUser(user)}>{user.name}</li>)}
      </ul> */}
    </div>
  );
};

export default Left;
