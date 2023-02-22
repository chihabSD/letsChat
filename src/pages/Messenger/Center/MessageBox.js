import React from 'react'
import{FaGifts, FaImage, FaImages, FaPlusCircle, FaRegThumbsUp, FaSmile, FaStickerMule, FaStickyNote, FaThumbsUp} from 'react-icons/fa'
import{AiOutlineGif} from 'react-icons/ai'
const MessageBox = ({handleMessageInput, handleSendButton}) => {
    const iconsSize = 25
  return (
    <div className="message-box-container">
<div className="message-box-container-left">
      <div className='item'><FaPlusCircle size={iconsSize}/> </div>
      <div className='item'><FaImages size={iconsSize}/> </div>
      <div className='item'><AiOutlineGif size={iconsSize}/> </div>
      <div className='item'><FaSmile size={iconsSize}/> </div>

</div>
    <div className="messages-send-box">
      <input
        type="text"
        placeholder="Say Something to Chihableddine "
        name="message"
        onChange={handleMessageInput}
      />
      <div className='emoji'><FaSmile size={iconsSize}/> </div>
      {/* <button onClick={() => handleSendButton()}>Send </button> */}
    </div>
<div className="message-box-container-left">
      <div className='item'><FaRegThumbsUp size={iconsSize}/> </div>

</div>
    </div>
  )
}

export default MessageBox