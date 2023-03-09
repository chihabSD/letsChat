import React, { useContext, useEffect, useState } from "react";
import { FaImage, FaPlus, FaSearch } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { GroupContext } from "../contexts";
import { useRedux } from "../hooks/useRedux";
import { _updateConversationUser } from "../redux/actions/friends/updateConversationUser";
import { _toggleNewConversation } from "../redux/reducers/toggler";
const EditGroupAdmins = () => {
  const {
    dispatch,
    friends,
    searchUsers,
    selectedConversation,
    conversations,
    account: { image, _id },
  } = useRedux();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const handleGroupNameInput = (e) => {
    setKeyword(e.target.value);
  };

  //   let filteredArray = [...selectedConversation.members]
  //   const  currentAdmins = filteredArray.some((item, index) => {
  //     item.role == "admin" &&
  //       filteredArray.unshift(filteredArray.splice(index, 1)[0]);
  //   });
  const currentAdmins = selectedConversation.members.filter(
    (item) => item.role === "admin"
  );
  const users = selectedConversation.members.filter(
    (item) => item.role != "admin"
  );
  const { toggleEditGroupAdmins } = useContext(GroupContext);

  const makeHimAdmin = user => {
    dispatch(
        _updateConversationUser({
          updateType: "makeAdmin",
          user, 
          conversationType: selectedConversation.type,
          conversationId: selectedConversation._id,
        })
      );
    toggleEditGroupAdmins();
  }
  return (
    <div className="message-reactions-modal newGroup">
      <div className="message-reactions-modal-inner">
        <header>
          <div className="title">
            <h1>Edit group admins </h1>
          </div>
          <div className="closeBtn" onClick={toggleEditGroupAdmins}>
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

          <h1> Current admins </h1>
          {currentAdmins.map((admin) => {
            return <div>{admin.user.username}</div>;
          })}

          <h1> Select user from below to make admin </h1>
          <hr />
          {users.map(({user}) => {
            return (
              <div>
                {user._id}

                <h1
                onClick={()=>makeHimAdmin(user._id)}
                //   onClick={() => {
                   
                //     toggleEditGroupAdmins();
                //   }}
                >
                  MAKE ADMIN
                </h1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EditGroupAdmins;
