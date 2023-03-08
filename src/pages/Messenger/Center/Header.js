import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useRedux } from "../../../hooks/useRedux";
import { _toggleRightSide } from "../../../redux/reducers/toggler";
import GroupHeader from "./GroupHeader";

export const Header = ({ selectedConversation }) => {
  const {
    dispatch,
    rightSideToggled,
    account: { _id },
  } = useRedux();
  const { type, members } = selectedConversation;
  const returnUser = members.find(({user}) => user._id != _id);
  if(type === 'group'){
    return <GroupHeader selectedConversation={selectedConversation} />
  }
  return (
    <div className="chat-header">
      {returnUser.user.username}

      <div className="chat-header-right">
        <div onClick={() => dispatch(_toggleRightSide())}>
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
