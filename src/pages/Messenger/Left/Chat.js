import React from 'react'
import { IMAGE_URL } from '../../../api/endpoint'

const Chat = ({chat, selectedChat, handleSelectedChat}) => {
  return (
    <div className={`${selectedChat._id === chat._id ? "chat select-chat":'chat'}`} onClick={()=>handleSelectedChat(chat)}>
        <div className='chat-left'>
            <img src={`${IMAGE_URL}/11829passport.jpg`}/>
        </div>
        <div className="chat-right">
        <div className='chat-right-top'>
            <p>

        {chat.user.username}
            </p>
            <p>09:30</p>
        </div>
        <div className='chat-right-bottom'>
        <p>

        {chat.latestMessage}
        </p>
        <p>99</p>
        </div>
        </div>
    </div>
  )
}

export default Chat