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
import { useMain } from "../../../hooks/useMainState";
import { _toggleEmojiBox } from "../../../redux/reducers/toggler";
import { useRedux } from "../../../hooks/useRedux";
import { TbSend } from "react-icons/tb";
const MessageBox = ({
  children,
  showEmojiBox,

  toggleEmojiBox,
  message,
  handleSend,
  handleSendButton,
handleImageUpload, 
  handleMessageInput,
}) => {
  const { emojiBoxyToggled, dispatch } = useRedux();
  const iconsSize = 25;
  return (
    <div className="message-box-container">
      {children}
      <div className="message-box-container-left">
        {/* <div className="item">
          <FaPlusSquare size={iconsSize} />{" "}
        </div> */}
    
          <div className="image-select">
            <label htmlFor="image"> <FaImage size={20} /></label>
            <input type="file" id="image" name="image" accept="image/*" onChange={handleImageUpload}/>
          </div>
       
        <div className="item">
          <AiOutlineGif size={iconsSize} />{" "}
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
          //   onChange={e => setMessage(e.target.value)}
        />
        <div className="emoji" onClick={() => dispatch(_toggleEmojiBox())}>
          <FaSmile size={iconsSize} />{" "}
        </div>
      </div>

      <div className="send" onClick={handleSend}>
        <TbSend size={20} color="white" />
      </div>
    </div>
  );
};

export default MessageBox;
