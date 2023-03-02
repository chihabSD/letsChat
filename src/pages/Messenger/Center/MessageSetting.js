import React from "react";
import { BsReply } from "react-icons/bs";
import { FaSmile } from "react-icons/fa";
import { TbDotsVertical } from "react-icons/tb";
import { useRedux } from "../../../hooks/useRedux";
const MessageSetting = ({
  reactionVisible,
  toggleReactionModal,
  message,
  selectedMessage,
  handleSelectedMessage,
  currentMessage,
  handleMouseOver,
  handleSelectedReaction,
  handleMessageAction,
  settingsModalVisible,
  handleSettings,
  handleSelectedReply
}) => {
  const {
    messageReactions,
    account: { _id },
  } = useRedux();
  const condition = reactionVisible && selectedMessage === message._id;
  const settings = settingsModalVisible && selectedMessage === message._id;
  const reactions = ["💔", "👍", "👎", "😄", "😕", "	🎉", "🚀", "👀"];
  const settingsActions = ["Remove"];

  const findReaction = messageReactions.find(
    (reaction) => reaction._id === message._id
  );

  const currentUser = findReaction.reactions.find((emoji) => emoji.by === _id);

  const currentReaction = findReaction.reactions.map((r) => r.reaction);
  const finalReaction = currentReaction.map((r) => r.reaction);
  // console.log(currentReaction);
  // console.log('current currentReaction', currentReaction);
  // const getUserReaction = messageReactions.find(
  //   (reaction) => reaction._id === message._id
  // );
  // console.log(getUserReaction);
  return (
    <div className="details hidden">
      <div className="item">
        <TbDotsVertical onClick={handleMessageAction} />
      </div>
      <div className="item" onClick={handleSelectedReply}>
        <BsReply />
      </div>
      <div className="item">
        <FaSmile className="icon" onClick={handleSelectedMessage} />
      </div>

      {settings && (
        <div className="message-settings-container">
          {settingsActions.map((setting) => (
            <div
              onClick={() => handleSettings(setting, message)}
              key={setting}
              // className={`${getUserReaction.reaction === undefined ? "item" : getUserReaction.reaction === reaction._id ? 'item selected':'item'}`}
              className="item"
            >
              {setting}
            </div>
          ))}
        </div>
      )}
      {condition ? (
        <div
          className="reactions-container"
          ref={currentMessage}
          onMouseOver={handleMouseOver}
        >
          {reactions.map((reaction) => (
            <div
              onClick={() => handleSelectedReaction(reaction, message)}
              key={reaction}
              // className={`${finalReaction === undefined ? "item" : finalReaction == reaction ? 'item selected':'item'}`}
              // className={`${findReaction.reactions.map(reaction => reaction.reaction === reaction ? 'item selected':'item')}`}
              // className={`${currentUser === reaction.by ? 'item selected' :'item '}`}
              className={`${findReaction.reactions.map((i) =>
                i.reaction === undefined
                  ? "item"
                  : i.reaction === reaction && i.by._id === _id
                  ? "item selected"
                  : "item h"
              )}`}
              // className="item"
            >
              {reaction}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default MessageSetting;
