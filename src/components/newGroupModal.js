import React, { useEffect, useState } from "react";
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
  const handleSelectedUser = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    console.log(user);
  };
  return (
    <div className="message-reactions-modal newGroup">
      <div className="message-reactions-modal-inner">
        <header>
          <div className="title">
            <h1>Add a new Group </h1>
          </div>
          <div className="closeBtn" onClick={() => dispatch(_toggleNewGroup())}>
            <GrClose color="white" />
          </div>
        </header>
        <div className="content">
          <h1> You will be added to this group by default as Admin </h1>
          {/* <p></p> */}
          <div className="users-container">
            <div className="user-added">
              {selectedUsers.length === 0 ? (
                <p>Please add a user</p>
              ) : (
                selectedUsers.map((user) => (
                  <div className="user">
                    <p>{user.username}</p> <p className="cross" onClick={()=>alert('remove ite', user)}>  <GrClose color="white" /></p>
                  </div>
                ))
              )}
            </div>
            {friends.map((friend) => (
              <div
                className="user"
                key={friend}
                onClick={() => handleSelectedUser(friend)}
              >
                {friend.username}{" "}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewGroupModal;
