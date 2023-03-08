import React, { useContext, useEffect, useState } from "react";
import { AiOutlineStop } from "react-icons/ai";
import { FaBicycle, FaReply, FaTrash, FaTrashRestore } from "react-icons/fa";
import { Oval } from "react-loader-spinner";
import { ConversationContext } from "../../../contexts";
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
  handleImagePreview,
}) => {
  const {replyTo} = useContext(ConversationContext)
  const [updated, setUpdated] = useState(false);
  const {
    account: { _id },
    updatingMessage,
    messages,

    dispatch,
  } = useRedux();

  if (message.contentType === "message") {
    const findReaction = messages.find(
      (reaction) => reaction._id === message._id
    );

    const isUserReacted = findReaction.reactions.reactions.find(
      (i) => i.by._id == _id
    );
    let reactionLength = findReaction.reactions.reactions.length;
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

        {reactionLength === 0 && null}
        {reactionLength == 1 && (
          <div className="reaction" onClick={updateReaction}>
            <Reaction>
              {findReaction.reactions.reactions.map((reaction) => (
                <div key={reaction._id}>{reaction.reaction}</div>
              ))}
            </Reaction>
          </div>
        )}
        {reactionLength > 1 && (
          <div className="reaction plus" onClick={updateReaction}>
            <Reaction>
              {`${
                isUserReacted
                  ? isUserReacted.reaction
                  : findReaction.reactions.reactions[0].reaction
              } ${findReaction.reactions.reactions.length}`}
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
