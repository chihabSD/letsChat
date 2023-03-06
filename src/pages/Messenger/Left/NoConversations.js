import React from 'react'
import LeftHeader from './LeftHeader'
const NoConversations = () => {
  return (
    <div className="leftside empty">
    <LeftHeader />
    {/* <SearchFriendBox /> */}
    {/* <ChatList conversations={conversations} handleConversation={handleConversation} selectedConversation={selectedConversation}/> */}
   
    There is no conversationss
    {/* <NoChat /> */}
  
  </div>
  )
}

export default NoConversations