import React from "react";
import { BsArrowLeft, BsChevronDown } from "react-icons/bs";
import { useRedux } from "../../../hooks/useRedux";
import { _toggleRightSide } from "../../../redux/reducers/toggler";

const GroupHeader = ({ selectedConversation }) => {
  const { groupName, users } = selectedConversation;

  const formattedUsers =
    users.length > 40
      ? users.map((user) => <p>{user.username}</p>).slice(0, 40)
      : users.map((user, index) => (
          <p>
            {index === 0
              ? user.username
              :`,${user.username}`}
          </p>
        ));
  const { dispatch, rightSideToggled } = useRedux();
  return (
    <div className="chat-header group">
      <div className="left">
        <div className="left-pic">
          <div className="left-pic-container">Pic</div>
        </div>
        <div className="left-info">
          {<h1>{groupName ? groupName : "No group name yet !"}</h1>}
          <div className="users">{formattedUsers}</div>
        </div>
      </div>

      <div className="center-right">
        <div className="item">
            <BsChevronDown />
        </div>
       
      </div>

      {/* {users.length > 40
        ? users.map((user) => user.username).slice(0, 40)
        : users.map(
            (user, index) =>
              `${index == 0 ? user.username : `, ${user.username}`}`
          )} */}

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

export default GroupHeader;
