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
  handleSettings
}) => {
  const {
    account: { _id },
  } = useRedux();
  const condition = reactionVisible && selectedMessage === message._id;
  const settings = settingsModalVisible && selectedMessage === message._id;
  const reactions = ["💔", "👍", "👎", "😄", "😕", "	🎉", "🚀", "👀"];
  const settingsActions = ["Remove"];
  // const getUserReaction = message.reactions.reactions.find(
  //   (reaction) => reaction.by == _id
  // );
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
        <div className="message-settings-container" >
          {settingsActions.map((setting) => (
            <div
              onClick={() => handleSettings (setting, message)}
              key={setting}
              // className={`${getUserReaction.reaction === undefined ? "item" : getUserReaction.reaction === reaction ? 'item selected':'item'}`}
              className=""
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
              // className={`${getUserReaction.reaction === undefined ? "item" : getUserReaction.reaction === reaction ? 'item selected':'item'}`}
              className="item"
            >
              {reaction}
            </div>
          ))}
          {/* <div className="item">
            <TbDotsVertical />
          </div>
          <div className="item">
            <BsReply />
          </div>
          <div className="item">
            <FaSmile onClick={toggleReactionModal} />
          </div>

          <div className="item">
            <FaSmile onClick={toggleReactionModal} />
          </div>

          <div className="item">
            <FaSmile onClick={toggleReactionModal} />
          </div>

          <div className="item">
            <FaSmile onClick={toggleReactionModal} />
          </div>

          <div className="item">
            <FaSmile onClick={toggleReactionModal} />
          </div> */}
        </div>
      ) : null}
    </div>
  );
};

export default MessageSetting;
