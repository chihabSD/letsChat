import React from "react";
import {
  FaGifts,
  FaImage,
  FaImages,
  FaPlusCircle,
  FaPlusSquare,
  FaRegThumbsUp,
  FaSmile,
  FaStickerMule,
  FaStickyNote,
  FaThumbsUp,
} from "react-icons/fa";
import { AiFillAudio, AiOutlineGif } from "react-icons/ai";
import { useMain } from "../../../hooks/useMainState";
import { _toggleEmojiBox } from "../../../redux/reducers/toggler";
import { useRedux } from "../../../hooks/useRedux";
import { TbSend } from "react-icons/tb";
import { CiMicrophoneOn } from "react-icons/ci";
const MessageBox = ({
  children,
  message,
  handleSend,
  handleSendButton,
  handleImageUpload,
  handleMessageInput,
}) => {
  const { dispatch } = useRedux();
  const iconsSize = 25;
  const color = "white";
  return (
    <div className="message-box-container">
      {children}
      <div className="item-container">
        <div className="item">
          <CiMicrophoneOn size={iconsSize} color={color} />{" "}
        </div>
      </div>
      <div className="center">
        <input
          type="text"
          value={message}
          onKeyDown={(e) => handleSendButton(e)}
          placeholder="Say Something to Chihableddine "
          name="message"
          onChange={handleMessageInput}
        />
      </div>
      <div className="item-container">
        <div className="item">
          <label htmlFor="image">
            <FaImage size={20} color="white" />
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        <div className="item" onClick={() => dispatch(_toggleEmojiBox())}>
          <FaSmile size={iconsSize} />
        </div>
        <div className="item send" onClick={handleSend}>
          <TbSend size={20} color="white" />
        </div>
      
      </div>
    </div>
  );
};


export default MessageBox;
