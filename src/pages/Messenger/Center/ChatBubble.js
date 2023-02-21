import React from 'react'

const ChatBubble = ({right}) => {
  return (
    <div className={`${right ? 'chat-bubble-right':'chat-bubble-left'}`}>{right ? 'Mine':'Reciever '}</div>
  )
}

export default ChatBubble