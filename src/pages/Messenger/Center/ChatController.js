import React from "react";
import { useRedux } from "../../../hooks/useRedux";
import { MessageLeft } from "./MessageLeft";
import MessageRight from "./MessageRight";
const ChatController = ({ message, scrollRef }) => {
  console.log(message.message);
  const {
    account: { _id },
  } = useRedux();

  return message.senderId._id === _id || message.senderId._id === undefined ? (
    <MessageRight message={message} key={message._id} scrollRef={scrollRef} />
  ) : (
    <MessageLeft message={message} key={message._id} scrollRef={scrollRef} />
  );
  
};

export default ChatController;
