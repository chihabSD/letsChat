import React from 'react'
import Chat from './Chat'

const ChatList = ({chats, handleSelectedChat,
  

  selectedChat,
  
  }) => {
  return (
    <div className='chatList-container'>
      {chats.map(chat => <Chat chat={chat} selectedChat={selectedChat}  handleSelectedChat={handleSelectedChat}/>)}
    </div>
  )
}

export default ChatList