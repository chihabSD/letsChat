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
import { AiOutlineGif } from "react-icons/ai";
const MessageBox = ({ children,  showEmojiBox, 
    toggleEmojiBox,  handleMessageInput, message, handleSendButton }) => {
  const iconsSize = 25;
  return (
    <div className="message-box-container">
        {children}
      <div className="message-box-container-left">
        {/* <div className="image-upload">
  <span>
  <FaPlusSquare size={iconsSize}/> 
  </span>

  <input id="file-input" type="file" />
</div> */}

        {/* <input id="file-input" type="file" /> */}
        <div className="item">
          <FaPlusSquare size={iconsSize} />{" "}
        </div>
        <div className="item">
          <FaImages size={iconsSize} />{" "}
        </div>
        <div className="item">
          <AiOutlineGif size={iconsSize} />{" "}
        </div>
        <div className="item">
          <FaSmile size={iconsSize} />{" "}
        </div>
      </div>
      <div className="messages-send-box">
        <input
          type="text"
          value={message}
          onKeyDown={(e) => handleSendButton(e)}
          placeholder="Say Something to Chihableddine "
          name="message"
          onChange={handleMessageInput}
        />
        <div className="emoji" onClick={toggleEmojiBox}>
          <FaSmile size={iconsSize} />{" "}
        </div>
        {/* <button onClick={() => handleSendButton()}>Send </button> */}
      </div>
      <div className="message-box-container-left">
        <div className="item">
          <FaRegThumbsUp size={iconsSize} />{" "}
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
