import React, { useRef, useState } from "react";
import { FaChevronDown, FaEllipsisH, FaEllipsisV } from "react-icons/fa";
import { IMAGE_URL } from "../../../api/endpoint";
import { UserImage } from "../../../components/UserImage";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useRedux } from "../../../hooks/useRedux";

const LeftHeader = () => {

  const options = ['New Group', 'Settings', 'Log out']
  const [optionVisible, setOptionVisible] = useState(false)
  const {
    account: { username, _id, image },
  } = useRedux();


  const ref = useRef(null)
  const handleOption = option => {
    console.log(option);
  }
  useClickOutside(ref,  () => {
    setOptionVisible(false)
  })
  return (
    <div className="left-header">
      <left>
        <UserImage image={image} style={{ width: "40px", height: "40px" }} />
      </left>
      <right>
        <div className="item" onClick={()=>setOptionVisible(prev=>!prev)}>
          <FaEllipsisV />
        </div>
      </right>
      {optionVisible &&
      
      <div className="left-header-menu-container" ref={ref}>
      {options.map(option => (
        <div className="options" key={option} onClick={() => handleOption(option)}>
            <h1>{option}</h1>
        </div>
      ))}
      </div>
      }
     
    </div>
  );
};

export default LeftHeader;
