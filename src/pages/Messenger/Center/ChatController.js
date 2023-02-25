import React from "react";
import { useRedux } from "../../../hooks/useRedux";
import { MessageLeft } from "./MessageLeft";
import MessageRight from "./MessageRight";
const ChatController = ({
  message,
  scrollRef,
  reactionVisible,
  toggleReactionModal,
  handleMouseEnter, 
                currentMessage, selectedItem 
}) => {
  const {
    account: { _id },
  } = useRedux();

  return message.senderId._id === _id || message.senderId._id === undefined ? (
    <MessageRight
    selectedItem ={selectedItem }
    handleMouseEnter={handleMouseEnter}
                currentMessage={currentMessage}
      message={message}
      key={message._id}
      scrollRef={scrollRef}
      reactionVisible={reactionVisible}
      toggleReactionModal={toggleReactionModal}
    />
  ) : (
    <MessageLeft
      message={message}
      key={message._id}
      scrollRef={scrollRef}
      reactionVisible={reactionVisible}
      toggleReactionModal={toggleReactionModal}
    />
  );
};

export default ChatController;
