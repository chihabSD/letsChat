import React from 'react'
import { BsReply } from 'react-icons/bs'
import { FaSmile } from 'react-icons/fa'
import { TbDotsVertical } from 'react-icons/tb'
const MessageSetting = ({reactionVisible, toggleReactionModal, message,  selectedMessage, handleSelectedMessage, currentMessage, handleMouseOver }) => {
  const condition = reactionVisible &&
  selectedMessage === message._id
  return (
    <div className="details hidden">
    <div className="item">
      <TbDotsVertical />
    </div>
    <div className="item">
      <BsReply />
    </div>
    <div className="item">
      <FaSmile
        className="icon"
        onClick={handleSelectedMessage}
      />
    </div>
    {condition ? (
      <div
        className="reactions-container"
        ref={currentMessage}
        onMouseOver={handleMouseOver}
      >
        <div className="item">
          <TbDotsVertical />
        </div>
        <div className="item">
          <BsReply />
        </div>
        <div className="item">
          <FaSmile onClick={toggleReactionModal} />
        </div>

        <div className="item">
          <FaSmile onClick={toggleReactionModal} />
        </div>

        <div className="item">
          <FaSmile onClick={toggleReactionModal} />
        </div>

        <div className="item">
          <FaSmile onClick={toggleReactionModal} />
        </div>

        <div className="item">
          <FaSmile onClick={toggleReactionModal} />
        </div>
      </div>
    ) : null}
  </div>
  )
}



export default MessageSetting