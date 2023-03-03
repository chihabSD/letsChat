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
  handleSelectedReply,
}) => {
  const {
    messages,
    account: { _id },
  } = useRedux();
  const condition = reactionVisible && selectedMessage === message._id;
  const settings = settingsModalVisible && selectedMessage === message._id;
  const reactions = ["💔", "👍", "👎", "😄", "😕", "	🎉", "🚀", "👀"];
  const settingsActions = ["Remove"];

  const findReaction = messages.find(
    (reaction) => reaction._id === message._id
  );

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
          {reactions.map((reaction) => {
            return <div
              onClick={() => handleSelectedReaction(reaction, message)}
              key={reaction}
              className={`${findReaction.reactions.reactions.map((i) =>
                i.reaction === undefined
                  ? "item"
                  : i.reaction === reaction && i.by._id === _id
                  ? "item selected"
                  : "item h"
              )}`}
              // className="item"
            >
              {reaction}
            </div>;
          })}
        </div>
      ) : null}
    </div>
  );
};

export default MessageSetting;
