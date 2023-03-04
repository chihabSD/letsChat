import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useRedux } from "../../../hooks/useRedux";
import { _toggleRightSide } from "../../../redux/reducers/toggler";

export const Header = ({ selectedConversation }) => {
  const {
    dispatch,
    rightSideToggled,
    account: { _id },
  } = useRedux();
  const returnUser = selectedConversation.users.find((user) => user._id != _id);
  return (
    <div className="chat-header">
      {returnUser.username}

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
