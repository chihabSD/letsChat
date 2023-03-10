import React, { useContext, useEffect, useState } from "react";
import { FaImage, FaPlus, FaSearch } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { UserImage } from "../components/UserImage";
import { ConversationContext } from "../contexts";
import { useRedux } from "../hooks";
import { _addToChatList } from "../redux/actions/friends/addToChatList";

import { _searchUser } from "../redux/actions/friends/searchUser";
import { insertSearchUsers } from "../redux/reducers/friends";
const NewConversation = () => {
  const {
    dispatch,
    friends,
    searchUsers,
    conversations,
    account: { image, _id },
  } = useRedux();
  const {toggleNewConversation } = useContext(ConversationContext)
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const handleSelectedUser = (user) => {
    dispatch(_addToChatList({ receiverId: user._id }));
    dispatch(toggleNewConversation);
    dispatch(insertSearchUsers([]));
  };

  const removeUser = (user) => {
    const newList = selectedUsers.filter((item) => item._id !== user._id);
    setSelectedUsers(newList);
  };
  const handleGroupNameInput = (e) => {
    setKeyword(e.target.value);
  };

  const searchUser = () => {
    console.log("create group");
  };

  useEffect(() => {
    if (keyword) {
      dispatch(_searchUser(keyword));
    }
  }, [keyword]);
  return (
    <div className="message-reactions-modal newGroup">
      <div className="message-reactions-modal-inner">
        <header>
          <div className="title">
            <h1>Find or create a conversation</h1>
          </div>
          <div
            className="closeBtn"
            onClick={toggleNewConversation}
          >
            <GrClose color="white" />
          </div>
        </header>
        <div className="content">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              placeholder="Search for a user to add to group "
              value={keyword}
              onChange={(e) => handleGroupNameInput(e)}
            />
          </div>
          {/* <h1> You will be added to this group by default as Admin </h1> */}

          <div className="users-container">
            {searchUsers.map((friend) => {
              let userList = [];
              conversations.map((conversation) => {
                conversation.users.map((user) => {
                  userList.push(user);
                });
              });
              const filterUser = userList.filter((user) => user._id != _id);
            
              const checkUser = filterUser.find(user => user._id === friend._id)
              return (
                <div className="users-list" key={friend}>
                  <div className="user-list-left">
                   
                    <UserImage
                      style={{ width: "50px", height: "50px" }}
                      image={friend.image}
                    />
                    {/* </div> */}
                    <h1>{friend.username}</h1>
                  </div>
                  <div
                    className="user-list-right"
                    onClick={checkUser ? null:  () => handleSelectedUser(friend)}
                  >
                    {/* Select */}
                    {checkUser ? "Already in converstion":'Add'}
                  </div>
                </div>
              );
            })}
          </div>

          {/* <div className="bottom">
            <div className="btn" onClick={searchUser}>
            
              Search user
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default NewConversation;
