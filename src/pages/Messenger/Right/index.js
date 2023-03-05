import React, { useContext, useEffect } from "react";
import { GrClose } from "react-icons/gr";
import { IMAGE_URL } from "../../../api/endpoint";
import { ToggleContext } from "../../../contexts";
import { useMain } from "../../../hooks/useMainState";
import { useRedux } from "../../../hooks/useRedux";
import { _addToChatList } from "../../../redux/actions/friends/addToChatList";
import { _getFriends } from "../../../redux/actions/friends/getFriends";
import { _toggleRightSide } from "../../../redux/reducers/toggler";
import IsGroup from "./IsGroup";
import IsPrivate from "./isPrivate";

const Right = ({ selectedUser, selectedChat, selectedConversation }) => {
  const {
    dispatch,
    loading,
    conversations,
    friends,
    account: { _id },
    rightSideToggled,
  } = useRedux();
  // const {toggleRight} = useMain()
  // console.log(conversations[0].users);
  const addToChatList = (user) => {
    dispatch(_addToChatList({ receiverId: user._id }));
  };
  const { type, users } = selectedConversation;
  const userFound = users.find((user) => user._id !== _id);
  useEffect(() => {
    dispatch(_getFriends());
  }, []);
  if (type === "group") {
    return <IsGroup selectedConversation={selectedConversation} />;
  }
  if (type === "private") {
    return <IsPrivate selectedConversation={selectedConversation} />;
    
  }
};

export default Right;
