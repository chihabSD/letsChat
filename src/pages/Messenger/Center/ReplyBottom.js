import React, { useContext } from 'react'
import { ConversationContext } from '../../../contexts'

const ReplyBottom = ({  replyTo,  _id}) => {
  const { toggleIsReply}  = useContext(ConversationContext)
  return (
    <div className="bottom-reply-container">
    <div className="top">
      <p>
        Reply to
        <span>
          {replyTo.senderId._id === _id
            ? "yourself"
            : `${replyTo.senderId.username}`}
        </span>
      </p>
      <p className="close" onClick={toggleIsReply}>
        X
      </p>
    </div>
    {replyTo ? (
      replyTo.type === "text" ? (
        <p>
          {replyTo.message.length > 40
            ? `${replyTo.message.slice(0, 40)}...`
            : replyTo.message}

        </p>
      ) : (
        <p>Reply to Image</p>
      )
    ) : null}
  </div>
  )
}

export default ReplyBottom