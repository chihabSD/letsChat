import React, { useContext } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { ConversationContext } from "../../../contexts";
import { useRedux } from "../../../hooks/useRedux";
import GroupHeader from "./GroupHeader";

export const Header = () => {
  const {
    dispatch,
    selectedConversation, 
    account: { _id },
  } = useRedux();
  const { rightSideToggled, toggleRightSide } = useContext(ConversationContext);
  const { type, members } = selectedConversation;
  const returnUser = members?.find(({user}) => user._id != _id);
  if(type === 'group'){
    return <GroupHeader selectedConversation={selectedConversation} />
  }
  return (
    <div className="chat-header">
      {returnUser.user.username}

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
