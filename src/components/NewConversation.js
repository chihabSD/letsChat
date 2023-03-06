import React, { useEffect, useState } from "react";
import { FaImage, FaPlus, FaSearch } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { useRedux } from "../hooks/useRedux";
import { _addToChatList } from "../redux/actions/friends/addToChatList";
import { _searchUser } from "../redux/actions/friends/searchUser";
import { insertSearchUsers } from "../redux/reducers/friends";
import { _toggleNewConversation  } from "../redux/reducers/toggler";
import { UserImage } from "./UserImage";
const NewConversation = () => {
  const {
    dispatch,
    friends,
    searchUsers, 
    currentMessageReactions,
    account: { image },
  } = useRedux();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const handleSelectedUser = (user) => {
    dispatch(_addToChatList({ receiverId: user._id }));
    dispatch(_toggleNewConversation())
    dispatch(insertSearchUsers([]))

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
if(keyword){
    dispatch(_searchUser(keyword))
}
}, [keyword])
  return (
    <div className="message-reactions-modal newGroup">
      <div className="message-reactions-modal-inner">
        <header>
          <div className="title">
            <h1>Find or create a conversation</h1>
          </div>
          <div className="closeBtn" onClick={() => dispatch((_toggleNewConversation()))}>
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
           
            {searchUsers.map((friend) => (
              <div className="users-list" key={friend}>
                <div className="user-list-left">
                  {/* <div className="user-pic"> */}
                    <UserImage style={{width:'50px', height:'50px'}} image={friend.image} />
                  {/* </div> */}
                  <h1>{friend.username}</h1>
                </div>
                <div
                  className="user-list-right"
                  onClick={() => handleSelectedUser(friend)}
                >
                 Select
                  {/* <FaPlus className="icon" /> Add */}
                  
                </div>
              </div>
            ))}
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
