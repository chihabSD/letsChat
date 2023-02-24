import React from 'react'
import { BsReply } from 'react-icons/bs'
import { FaSmile } from 'react-icons/fa'
import { TbDotsVertical } from 'react-icons/tb'
const MessageSetting = () => {
  return (
    <div className="details hidden">
    <div className="item">
      <TbDotsVertical />
    </div>
    <div className="item">
      <BsReply />
    </div>
    <div className="item">
      <FaSmile className="icon" />
    </div>
  </div>
  )
}


export default MessageSetting