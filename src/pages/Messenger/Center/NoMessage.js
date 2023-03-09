import React from "react";
import { TbMessageCircleOff } from "react-icons/tb";
import EmptyLayout from "../../../Layouts/EmptyLayout";

const NoMessage = ({ selectedConversation }) => {
  return (
    <EmptyLayout>
      <TbMessageCircleOff size={100} />
      <h1> No Messages</h1>
      <p>When you have message,</p>
      <p>you will see them here</p>
      <h1>
        {selectedConversation.type === "group"
          ? selectedConversation.groupName
          : selectedConversation._id}
      </h1>
    </EmptyLayout>
  );
};

export default NoMessage;
