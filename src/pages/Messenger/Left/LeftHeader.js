import React, { useContext, useRef, useState } from "react";
import {  FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserImage } from "../../../components/UserImage";
import { ConversationContext } from "../../../contexts";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useRedux } from "../../../hooks/useRedux";
import { _logout } from "../../../redux/actions/auth/logout";
const LeftHeader = () => {
  const {toggleNewConversation, toggleNewGroup  } = useContext(ConversationContext)
  const navigate = useNavigate();
  const options = ["Private conversation", "New Group", "Settings", "Log out"];
  const [optionVisible, setOptionVisible] = useState(false);
  const {
    dispatch,
    account: { username, _id, image },
  } = useRedux();

  const ref = useRef(null);
  const toggleOptions = () => {
    setOptionVisible(!optionVisible);
  };
  useClickOutside(ref, () => {
    setOptionVisible(false)
  });

  const handleOption = (option) => {
    if (option === "Private conversation") {
      // dispatch(_toggleNewConversation());
      toggleNewConversation()
      toggleOptions();
      return;
    }
    if (option === "New Group") {
      toggleNewGroup()
      toggleOptions();
      return;
    }
    if (option === "Settings") {
      return console.log("settings");
    }
    if (option === "Log out") {
      dispatch(_logout());
      navigate("/login");
    }
  };
  return (
    <div className="left-header">
      <div className="left-header-left">
        <UserImage image={image} style={{ width: "40px", height: "40px" }} />
      </div>
      <div className="left-header-right">
        <div className="left">
          <h1>{username}</h1>
        </div>
        <div className="item" onClick={toggleOptions}>
          <FaEllipsisV />
        </div>
      </div>
      {optionVisible && (
        <div className="left-header-menu-container" ref={ref}>
          {options.map((option) => (
            <div
              className="options"
              key={option}
              onClick={() => handleOption(option)}
            >
              <h1>{option}</h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeftHeader;
