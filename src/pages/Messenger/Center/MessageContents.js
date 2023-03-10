import React, { useContext  } from "react";
import { CenterContext, ConversationContext } from "../../../contexts";
import { useRedux } from "../../../hooks/useRedux";
import {
  handleImagePreview,
  setSelectedReaction,
} from "../../../redux/reducers/friends";
// import { _toggleReactionListModal } from "../../../redux/reducers/toggler";
import { MessageTime } from "./MessageTime";
const MessageContents = ({ message, direction }) => {
  const { replyTo } = useContext(ConversationContext);
  const { toggleImagePreview, toggleMessageReactions } = useContext(CenterContext);
  const {
    account: { _id },
    messages,
    imagePreview,
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
      // dispatch(_toggleReactionListModal());
      toggleMessageReactions()
    };
    const handleImage = (img) => {
      // console.log(img, imagePreview);
      if (imagePreview.length > 0) {
        dispatch(handleImagePreview([]));
        toggleImagePreview();
        return;
      }
      dispatch(handleImagePreview({ imageUrl: img }));
      toggleImagePreview();
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
            // onClick={toggleImagePreview}
            onClick={() => handleImage(message.imageUrl)}
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
