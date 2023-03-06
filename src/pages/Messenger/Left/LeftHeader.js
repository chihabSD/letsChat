import React, { useRef, useState } from "react";
import { FaChevronDown, FaEllipsisH, FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../../../api/endpoint";
import { UserImage } from "../../../components/UserImage";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useRedux } from "../../../hooks/useRedux";
import { _logout } from "../../../redux/actions/auth/logout";
import { _toggleNewGroup } from "../../../redux/reducers/toggler";

const LeftHeader = () => {
    const navigate = useNavigate();
  const options = ["New Group", "Settings", "Log out"];
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
    toggleOptions();
  });

  const handleOption = (option) => {
  if(option === 'New Group'){
  dispatch(_toggleNewGroup())
  toggleOptions()
  return
  }
  if(option === 'Settings'){
    return console.log('settings');
  }
  if(option === 'Log out'){
        dispatch(_logout());
        navigate("/login");
  }
  };
  return (
    <div className="left-header">
      <left>
        <UserImage image={image} style={{ width: "40px", height: "40px" }} />
      </left>
      <right>
        <div className="left">
          <h1>{username}</h1>
        </div>
        <div className="item" onClick={toggleOptions}>
          <FaEllipsisV />
        </div>
      </right>
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
