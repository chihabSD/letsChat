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


 
  // const currentReaction = findReaction.reactions.map(r => r)
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
      <div className="item">
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
              // className="item"
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
              // className={`${currentReaction.reaction === undefined ? "item" : currentReaction.reaction === reaction ? 'item selected':'item'}`}
              // className={`${findReaction.reactions.map(reaction => reaction.reaction === reaction ? 'item selected':'item')}`}
              className={`${findReaction.reactions.map(i => i.reaction === undefined  ? 'item': i.reaction === reaction ? 'item selected':'item')}`}
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
