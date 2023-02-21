import React from "react";
import NoChat from "../../../components/NoChat";
import ActiveUsers from "./ActiveUsers";
import ChatList from "./ChatList";
import { LeftTop } from "./LeftTop";
import SearchFriendBox from "./SearchFriendBox";

const Left = ({
  users,
  chats,
  handleSelectedUser,
  selectedUser,
  handleSelectedChat,
  selectedChat,
}) => {
  return (
    <div className="leftside">
      <LeftTop />
      <SearchFriendBox />
      {/* <ActiveUsers /> */}
      <ChatList chats={chats} handleSelectedChat={handleSelectedChat} selectedChat={selectedChat}/>
      {/* <NoChat /> */}
      {/* <ul>
        {users.map(user => <li onClick={() => handleSelectedUser(user)}>{user.name}</li>)}
      </ul> */}
    </div>
  );
};

export default Left;
