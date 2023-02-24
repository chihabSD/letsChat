import React from "react";
import {
  FaCat,
  FaFlagUsa,
  FaObjectGroup,
  FaSearch,
  FaSmile,
} from "react-icons/fa";
import { CiBasketball, CiForkAndKnife } from "react-icons/ci";
import { TbIcons } from "react-icons/tb";
import { emojis } from "../../../data";
import { AiFillCar, AiOutlineBulb } from "react-icons/ai";
const EmojiBox = ({el,selectedEmoji}) => {
  const emojiCategory = [
    { id: 0, name: "people", icon: <FaSmile /> },
    { id: 1, name: "animals and nature", icon: <FaCat /> },
    { id: 2, name: "animals and nature", icon: <FaCat /> },
    { id: 3, name: "animals and nature", icon: <FaCat /> },
    { id: 4, name: "animals and nature", icon: <FaCat /> },
    { id: 5, name: "animals and nature", icon: <FaCat /> },
    { id: 6, name: "animals and nature", icon: <FaCat /> },
    { id: 7, name: "animals and nature", icon: <FaCat /> },
  ];
  return (
    <div className="emoji-box-container" ref={el}>
      <div className="emojiheader-container">
        <div className="emojiheader-container-search">
          <FaSearch size={20} color="grey" />
          <input type="text" placeholder="search for an emoji" />
        </div>
      </div>
      <div className="emoji-contents">
        {emojis.map((emoji) => (
          <div key={emoji.emoji} className="emojiIcon" onClick={()=>selectedEmoji(emoji)}>{emoji.emoji}</div>
        ))}
      </div>

      <div className="emojibottom">
        <div className="item">
          <FaSmile />
        </div>
        <div className="item">
          <FaCat />
        </div>
        <div className="item">
          <CiForkAndKnife />
        </div>
        <div className="item">
          <CiBasketball />
        </div>
        <div className="item">
          <AiFillCar />
        </div>
        <div className="item">
          <AiOutlineBulb />
        </div>
        <div className="item">
          <TbIcons />
        </div>
        <div className="item">
          <FaFlagUsa />
        </div>
      </div>
    </div>
  );
};

export default EmojiBox;
