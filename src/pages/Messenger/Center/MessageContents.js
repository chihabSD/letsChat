import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useRedux } from "../../../hooks/useRedux";
import { _toggleReactionListModal } from "../../../redux/reducers/toggler";
import { MessageTime } from "./MessageTime";
const MessageContents = ({
  message,
  imageUploading,
  direction,
  handleReactionUpdate,
  handleImagePreview,
}) => {
  const {
    account: { _id },
    messageReactions,
    currentMessage,
    latestReaction,
    dispatch
  } = useRedux();

  
  const findReaction = messageReactions.find(
    (reaction) => reaction._id === message._id
  );

  const isUserReacted = message.reactions.reactions.find(
    (reaction) => reaction.by === _id
  );

  const updateReaction = () => {
    // console.log('Current reactoin', findReaction);
    // dispatch(_toggleReactionListModal())
  };

  return (
    <div className="message-content">
      {message.type === "text" && message.message}
      {message.type === "image" && (
        <div
          className="message-image"
          onClick={() => handleImagePreview(message)}
        >
          
          <img src={message.imageUrl} />
        </div>
      )}

      {findReaction.reactions.length === 0 && null}
      {findReaction.reactions.length == 1 && (
        <div className="reaction" onClick={()=>dispatch(_toggleReactionListModal())}>
          <Reaction>
            {findReaction.reactions.map((reaction) => (
              <div key={reaction._id}>{reaction.reaction}</div>
            ))}
          </Reaction>
        </div>
      )}
      {findReaction.reactions.length > 1 && (
        <div className="reaction plus" onClick={()=>dispatch(_toggleReactionListModal())}>
          <Reaction>
            {`${findReaction.reactions[0].reaction} ${findReaction.reactions.length} `}
          </Reaction>
        </div>
      )}

      <MessageTime date={message.createdAt} right={direction} />
    </div>
  );
};

const Reaction = ({ reactionLength, message, children }) => {
  return <div className="content">{children}</div>;
};
export default MessageContents;
