import React, { useContext, useEffect, useState } from "react";
import { FaImage, FaPlus, FaSearch } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { UserImage } from "../components/UserImage";
import { GroupContext } from "../contexts";
import { useGroup } from "../hooks/groupState";
import { useRedux } from "../hooks/useRedux";
import { _addToChatList } from "../redux/actions/friends/addToChatList";
import { _searchUser } from "../redux/actions/friends/searchUser";
import { _updateConversationUser } from "../redux/actions/friends/updateConversationUser";

const AddUsersToGroup = () => {
  const {
    dispatch,
    searchUsers,
    conversations,
    selectedConversation,
    account: { image, _id },
  } = useRedux();
  const { toggleAddUsers } = useContext(GroupContext);
  const [selectedUsers, setSelectedUsers] = useState([]);
  //   const [keyword, setKeyword] = useState("");
  //   const [groupName, setGroupName] = useState("");
  const [inputs, setInputs] = useState({ keyword: "" });
  const { keyword, groupName } = inputs;
  const handleSelectedUser = (user) => {
    const userExists = selectedUsers.find((i) => i._id === user._id);
    if (userExists) return null;
    setSelectedUsers([...selectedUsers, user]);
  };
  const removeUser = (user) => {
    const newList = selectedUsers.filter((item) => item._id !== user._id);
    setSelectedUsers(newList);
  };
  const handleInput = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleAddUsersToGroup = () => {
    dispatch(
      _updateConversationUser({
        updateType: "addUsers",
        users: selectedUsers,
        conversationType: selectedConversation.type,
        conversationId: selectedConversation._id,
      })
    );

    toggleAddUsers();

    // console.log("create group", inputs, selectedUsers);
    //   users, groupName,   isGroup
    //   dispatch(_addToChatList({users:selectedUsers, groupName, isGroup:true}))
    //   dispatch(_toggleNewGroup())
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
            <h1>Add participants to this group </h1>
          </div>
          <div className="closeBtn" onClick={toggleAddUsers}>
            <GrClose color="white" />
          </div>
        </header>
        <div className="content">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              placeholder="Search for a user to add to group "
              value={keyword}
              name="keyword"
              onChange={(e) => handleInput(e)}
            />
          </div>

          <div className="users-container">
            <div className="user-added">
              {selectedUsers.length === 0 ? (
                <p>
                  Please add a user from the list below or search for him above{" "}
                </p>
              ) : (
                selectedUsers.map((user) => (
                  <div className="user" key={user._id}>
                    <p>{user.username}</p>{" "}
                    <p className="cross">
                      <GrClose
                        color="white"
                        className="remove"
                        onClick={() => removeUser(user)}
                      />
                    </p>
                  </div>
                ))
              )}
            </div>
            {searchUsers.map((friend) => {
              let userList = [];
              conversations.map((conversation) => {
                conversation.users.map((user) => {
                  userList.push(user);
                });
              });
              const filterUser = userList.filter((user) => user._id != _id);

              const checkUser = filterUser.find(
                (user) => user._id === friend._id
              );
              const hideAdd = selectedUsers.find(
                (user) => user._id === friend._id
              );
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

                  {/* {selectedUsers.find((i) => i._id == friend._id ? null :   <div
                    className="user-list-right"
                    onClick={() => handleSelectedUser(friend)}
                  >
                    Adds
                  </div> )} */}
                  {/* {selectedUsers.find(item => item.user._id == friend._id ? "ss":"No")} */}
                  <div
                    className="user-list-right"
                    onClick={
                      checkUser ? null : () => handleSelectedUser(friend)
                    }
                  >
                    {checkUser ? "Already added" : hideAdd ? null : "Add"}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bottom" onClick={handleAddUsersToGroup}>
            <div className="btn">Add Users</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUsersToGroup;
