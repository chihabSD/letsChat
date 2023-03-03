import React, { useEffect, useState } from "react";
import { AiOutlineStop } from "react-icons/ai";
import { FaReply } from "react-icons/fa";
import { Oval } from "react-loader-spinner";
// import Reply from "../../../../../backend/src/models/reply";
import { useRedux } from "../../../hooks/useRedux";
import { setSelectedReaction } from "../../../redux/reducers/friends";
import { _toggleReactionListModal } from "../../../redux/reducers/toggler";
import DeletedMessage from "./DeletedMessage";
import { MessageTime } from "./MessageTime";
import Reply from "./Reply";
const MessageContents = ({
  message,
  imageUploading,
  direction,
  handleReactionUpdate,
  replyTo,
  handleCurrentMessageReply,
  handleImagePreview,
  handleRestore
}) => {
  const [updated, setUpdated]= useState(false)
  const {
    account: { _id },
updatingMessage, 
    messages,

    dispatch,
  } = useRedux();

  
  // useEffect(() =>{
  //   if(updatingMessage){
  //     console.log('updating');
  //     setUpdated(true)
  //   }else {
  //     setUpdated(FALSE)
  //   }
  //   }, [updatingMessage])

  // REPLY
  if (message.contentType === "reply") {
    return (
      <Reply
        handleCurrentMessageReply={handleCurrentMessageReply}
        message={message}
        direction={direction}
        _id={_id}
      />
    );
  }

 
  // DELETED MESSAGE
  if (message.contentType === "message" && message.deletedBy.length > 0) {
    // check who deleted this

    const findUser = message.deletedBy.find((user) => user.by === _id);
    if (findUser) {
      return (
        <div className="deletedBy-current-user">
          <div className="message-deleted"> <AiOutlineStop /> You deleted this message </div>
          <div className="restore" onClick={() => handleRestore(message)}>Restore</div>
        </div>
      );
    } else {
      const findReaction = messages.find(
        (reaction) => reaction._id === message._id
      );
  
      const isUserReacted = message.reactions.reactions.find(
        (reaction) => reaction.by === _id
      );
  
      const updateReaction = () => {
        dispatch(setSelectedReaction(findReaction));
        dispatch(_toggleReactionListModal());
      };
  
      return (
        <div
          className={`${
            replyTo && replyTo._id === message._id
              ? "message-content selected"
              : "message-content"
          }`}
        >
         
          {message.type === "text" && message.message}
          
          {message.type === "image" && (
            <div
              className="message-image"
              onClick={() => handleImagePreview(message)}
            >
              <img src={message.imageUrl} />
            </div>
          )}
  
          {findReaction.reactions.reactions.length === 0 && null}
          {findReaction.reactions.reactions.length == 1 && (
            <div className="reaction" onClick={updateReaction}>
              <Reaction>
                {findReaction.reactions.reactions.map((reaction) => (
                  <div key={reaction._id}>{reaction.reaction}</div>
                ))}
              </Reaction>
            </div>
          )}
          {findReaction.reactions.reactions.length > 1 && (
            <div className="reaction plus" onClick={updateReaction}>
              <Reaction>
                {`${findReaction.reactions.reactions[0].reaction} ${findReaction.reactions.reactions.length} `}
              </Reaction>
            </div>
          )}
  
          <MessageTime date={message.createdAt} right={direction} />
        </div>
  
    )}
    // return  <DeletedMessage />
  }

  // NORMAL MESSAGE
  if (message.contentType === "message") {
    const findReaction = messages.find(
      (reaction) => reaction._id === message._id
    );

    const isUserReacted = message.reactions.reactions.find(
      (reaction) => reaction.by === _id
    );

    const updateReaction = () => {
      dispatch(setSelectedReaction(findReaction));
      dispatch(_toggleReactionListModal());
    };

    return (
      <div
        className={`${
          replyTo && replyTo._id === message._id
            ? "message-content selected"
            : "message-content"
        }`}
      >
        {message.type === "text" && message.message}
        {message.type === "image" && (
          <div
            className="message-image"
            onClick={() => handleImagePreview(message)}
          >
            <img src={message.imageUrl} />
          </div>
        )}

        {findReaction.reactions.reactions.length === 0 && null}
        {findReaction.reactions.reactions.length == 1 && (
          <div className="reaction" onClick={updateReaction}>
            <Reaction>
              {findReaction.reactions.reactions.map((reaction) => (
                <div key={reaction._id}>{reaction.reaction}</div>
              ))}
            </Reaction>
          </div>
        )}
        {findReaction.reactions.reactions.length > 1 && (
          <div className="reaction plus" onClick={updateReaction}>
            <Reaction>
              {`${findReaction.reactions.reactions[0].reaction} ${findReaction.reactions.reactions.length} `}
            </Reaction>
          </div>
        )}

        <MessageTime date={message.createdAt} right={direction} />
      </div>
    );
  }
};

const Reaction = ({ reactionLength, message, children }) => {
  return <div className="content">{children}</div>;
};
export default MessageContents;
