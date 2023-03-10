import React, { useEffect } from "react";

import { useRedux } from "../../../hooks/useRedux";
import { _addToChatList } from "../../../redux/actions/friends/addToChatList";
import { _toggleRightSide } from "../../../redux/reducers/toggler";
import IsGroup from "./IsGroup";
import IsPrivate from "./isPrivate";

const Right = () => {
  const { dispatch, selectedConversation } = useRedux();

  const { type } = selectedConversation;

 
  if (type === "group") {
    return <IsGroup />;
  }
  if (type === "private") {
    return <IsPrivate />;
  }
};

export default Right;
