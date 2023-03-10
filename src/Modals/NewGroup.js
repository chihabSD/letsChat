import React, { useContext, useEffect, useState } from "react";
import { FaImage, FaPlus, FaSearch } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { UserImage } from "../components/UserImage";
import { ConversationContext } from "../contexts";
import { useRedux } from "../hooks/useRedux";
import { _addToChatList } from "../redux/actions/friends/addToChatList";
import { _searchUser } from "../redux/actions/friends/searchUser";
const NewGroup = () => {
  const { dispatch, searchUsers } = useRedux();
  const { toggleNewGroup } = useContext(ConversationContext);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [inputs, setInputs] = useState({ keyword: "", groupName: "" });
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

  const handleGroupCreation = () => {
    dispatch(
      _addToChatList({ users: selectedUsers, groupName, isGroup: true })
    );
    dispatch(toggleNewGroup);
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
            <h1>Create a group</h1>
          </div>
          <div className="closeBtn" onClick={toggleNewGroup}>
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

            <input
              placeholder="Group name"
              value={groupName}
              name="groupName"
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              placeholder="Search for a user to add to group "
              value={keyword}
              name="keyword"
              onChange={(e) => handleInput(e)}
            />
          </div>
          {/* <h1> You will be added to this group by default as Admin </h1> */}

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
              return (
                <div className="users-list" key={friend._id}>
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
                    onClick={() => handleSelectedUser(friend)}
                  >
                    Add
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bottom">
            <div className="btn" onClick={handleGroupCreation}>
              Create group{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewGroup;
