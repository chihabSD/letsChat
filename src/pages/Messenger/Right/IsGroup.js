import React, { useContext, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { ConversationContext, GroupContext } from "../../../contexts/index";
import { UserImage } from "../../../components/UserImage";
import { findCurrentUserDetails } from "../../../helpers/findMethods";
import { useRedux } from "../../../hooks/useRedux";
import EditGroupAdmins from "../../../Modals/EditGroupAdmins";
import { _deleteConversation } from "../../../redux/actions/friends/deleteConversation";
import { _existConversation } from "../../../redux/actions/friends/exitConversation";
import { _updateConversationUser } from "../../../redux/actions/friends/updateConversationUser";
import { useGroup } from "../../../hooks/groupState";
import AddUsersToGroup from "../../../Modals/AddUsersToGroup";
import { FaCross } from "react-icons/fa";

const IsGroup = () => {
  const {
    rightSideToggled,
    dispatch,
    account,
    selectedConversation,
    messages,
  } = useRedux();
const { toggleRightSide } = useContext(ConversationContext)
  const { groupName, members } = selectedConversation;
  const {
    toggleEditGroupAdmins,
    editGroupVisible,
    toggleAddUsers,
    addUsersVisible,
  } = useGroup();

  let filteredArray = [...members];

  filteredArray.some((item, index) => {
    item.role == "admin" &&
      filteredArray.unshift(filteredArray.splice(index, 1)[0]);
  });

  filteredArray.some((item, index) => {
    item.user._id == account._id &&
      filteredArray.unshift(filteredArray.splice(index, 1)[0]);
  });

  let hideLeft = filteredArray.filter((user) => user.isLeft != true);
  const findUser = findCurrentUserDetails(selectedConversation, account._id);

  return (
    <GroupContext.Provider
      value={{ toggleEditGroupAdmins, toggleAddUsers, addUsersVisible }}
    >
      {editGroupVisible && <EditGroupAdmins />}
      {addUsersVisible && <AddUsersToGroup />}

      <div className={`${rightSideToggled ? "hideright" : "right"}`}>
        <header>
          <div
            className="icon-close"
            onClick={        toggleRightSide}
          >
            <GrClose />
          </div>
          <h1>Group info </h1>
        </header>
        <div className="info">
          <div className="info-top">
            <div className="info-pic">Info pic</div>
            <div className="details">
              <h1>{groupName ? groupName : "No group name yet!"}</h1>
              <h1> Group : {hideLeft.length} </h1>
            </div>
          </div>

          <div className="info-bottom">
            <div className="users">
              <p>{hideLeft.length} participants</p>

              {hideLeft.map(({ user, role }) => {
                return (
                  <div className="user" key={user._id}>
                    <div className="left">
                      <div className="left-left">
                        <UserImage image={user.image} />
                      </div>
                      <div className="left-right">
                        <h1>
                          {user._id === account._id ? "You" : user.username}
                        </h1>
                        <h1>{role == "admin" && "Admin"}</h1>
                      </div>
                    </div>
                    <div className="right">
                 
                      <p
                        onClick={() =>
                          dispatch(
                            _updateConversationUser({
                              updateType: "removeUser",
                              user: user._id,
                              conversationType: selectedConversation.type,
                              conversationId: selectedConversation._id,
                            })
                          )
                        }
                      >
                        <GrClose />
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <hr />
            <h3 onClick={toggleAddUsers}>ADD USER TO GROUP</h3>
            <hr />
            <h3
              onClick={() =>
                dispatch(_deleteConversation(selectedConversation._id))
              }
            >
              DELETE
              {findUser.role === "admin" ? "Delete group" : null}
            </h3>

            <hr />

            {findUser.isLeft ? (
              <h3
                onClick={() =>
                  dispatch(
                    _updateConversationUser({
                      updateType: "addBack",
                      conversationType: selectedConversation.type,
                      conversationId: selectedConversation._id,
                    })
                  )
                }
              >
                Add me back in
              </h3>
            ) : (
              <h3
                onClick={() =>
                  dispatch(_existConversation(selectedConversation._id))
                }
              >
                Exit group
              </h3>
            )}

            {findUser.role == "admin" ? (
              <h3 onClick={toggleEditGroupAdmins}>Edit group admins</h3>
            ) : null}
          </div>
        </div>
        {/* <div className="leftTop-container right">
        <div
          className="icon-close"
          onClick={() => dispatch(_toggleRightSide())}
        >
          <GrClose />
        </div>
        <h1>Group info </h1>
      </div>
      <div className="info">
        <div className="top">
          <div className="info-pic">Info pic</div>
          <div>group info </div>
        </div>
       
      </div>
      <div className="bottom">
            Botom
        </div> */}
      </div>
    </GroupContext.Provider>
  );
};

export default IsGroup;
