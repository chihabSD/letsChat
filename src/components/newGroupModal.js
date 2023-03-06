import React, { useEffect, useState } from "react";
import { FaImage, FaPlus, FaSearch } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { useRedux } from "../hooks/useRedux";
import { _toggleNewGroup } from "../redux/reducers/toggler";
import { UserImage } from "./UserImage";
const NewGroupModal = () => {
  const {
    dispatch,
    friends,
    currentMessageReactions,
    account: { image },
  } = useRedux();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [gropName, setGroupName] = useState("");
  const handleSelectedUser = (user) => {
    const userExists = selectedUsers.find((i) => i._id === user._id);
    if (userExists) return null;
    setSelectedUsers([...selectedUsers, user]);
    console.log(user);
  };
  const removeUser = (user) => {
    const newList = selectedUsers.filter((item) => item._id !== user._id);
    setSelectedUsers(newList);
  };
  const handleGroupNameInput = (e) => {

    setGroupName(e.target.value)
  }

  const handleGroupCreation = () => {
    console.log('create group');
  }
  return (
    <div className="message-reactions-modal newGroup">
      <div className="message-reactions-modal-inner">
        <header>
          <div className="title">
            <h1>Create a group</h1>
          </div>
          <div className="closeBtn" onClick={() => dispatch(_toggleNewGroup())}>
            <GrClose color="white" />
          </div>
        </header>
        <div className="content">
          <div className="group-control">
            <div className="group-control-left">
              <FaImage />
              <div className="plus-icon">
                <FaPlus />
              </div>
            </div>

            <input placeholder="Group name" />
          </div>
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input placeholder="Search for a user to add to group " value={gropName} onChange={(e) =>handleGroupNameInput(e)}/>
          </div>
          {/* <h1> You will be added to this group by default as Admin </h1> */}

          <div className="users-container">
            <div className="user-added">
              {selectedUsers.length === 0 ? (
                <p>Please add a user from the list below or search for him above </p>
              ) : (
                selectedUsers.map((user) => (
                  <div className="user">
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
            {friends.map((friend) => (
              <div className="users-list" key={friend}>
                <div className="user-list-left">
                  <div className="user-pic"></div>
                  <h1>{friend.username}</h1>
                </div>
                <div
                  className="user-list-right"
                  onClick={() => handleSelectedUser(friend)}
                >
                  {" "}
                  <FaPlus className="icon" /> Add
                </div>
              </div>
            ))}
          </div>

          <div className="bottom">
            <div className="btn" onClick={handleGroupCreation}>Create group </div>
        </div>
        </div>
    
      </div>
    </div>
  );
};

export default NewGroupModal;
