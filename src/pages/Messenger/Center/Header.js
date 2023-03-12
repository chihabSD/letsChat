import React, { useContext } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { ConversationContext } from "../../../contexts";
import { useRedux } from "../../../hooks/useRedux";
import GroupHeader from "./GroupHeader";

export const Header = () => {
  const {
    dispatch,
    activeUsers, 
    selectedConversation, 
    account: { _id },
  } = useRedux();
  const { rightSideToggled, toggleRightSide } = useContext(ConversationContext);
  const { type, members } = selectedConversation;
  const returnUser = members?.find(({user}) => user._id != _id);
  if(type === 'group'){
    return <GroupHeader selectedConversation={selectedConversation} />
  }
  const isOnline = activeUsers && activeUsers.length > 0 ? activeUsers.find(u => u.userId == returnUser.user._id) : null
  return (
    <div className="chat-header">
      {returnUser.user.username} 
      {isOnline ? "Online":null}

      <div className="chat-header-right">
        <div onClick={toggleRightSide}>
          {rightSideToggled && (
            <div className="expand-toggle">
              <BsArrowLeft size={25} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
