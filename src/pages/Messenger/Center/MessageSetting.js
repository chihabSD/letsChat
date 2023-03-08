import React, { useContext } from "react";
import { BsReply } from "react-icons/bs";
import { FaSmile } from "react-icons/fa";
import { TbDotsVertical, TbTrash } from "react-icons/tb";
import { ConversationContext } from "../../../contexts";
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
  // const {  } = useContext(ConversationContext)
  const condition = reactionVisible && selectedMessage === message._id;
  const settings = settingsModalVisible && selectedMessage === message._id;
  const reactions = ["💔", "👍", "👎", "😄", "😕", "	🎉", "🚀", "👀"];
  const settingsActions = ["Remove"];

  const findReaction = messages.find(
    (reaction) => reaction._id === message._id
  );

  return (
    <div className="message-settings hidden">
      <div className="item">
        <TbTrash color="red" onClick={() => handleSettings(message)} />
        {/* <TbDotsVertical onClick={handleMessageAction} /> */}
      </div>
      <div className="item" onClick={handleSelectedReply}>
        
        <BsReply />
      </div>
      <div className="item">
        <FaSmile className="icon" onClick={handleSelectedMessage} />
      </div>

      {/* {settings && (
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
      )} */}
      {condition ? (
        <div
          className="reactions-container"
          ref={currentMessage}
          onMouseOver={handleMouseOver}
        >
          {reactions.map((reaction) => {
            let isReactedByexistedUser = findReaction.reactions.reactions.find(
              (r) => r.by._id === _id
            );
            const condition =
              findReaction.reactions.reactions.length > 0
                ? isReactedByexistedUser &&
                  isReactedByexistedUser.reaction === reaction
                  ? "item selected"
                  : "item"
                : "item";
            return (
              <div
                onClick={() => handleSelectedReaction(reaction, message)}
                key={reaction}
                className={condition}
              >
                {reaction}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default MessageSetting;
