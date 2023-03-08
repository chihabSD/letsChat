import React from "react";
import { UserImage } from "../../../../components/UserImage";
import UserProfilePicLeft from "../UserProfilePicLeft";

const GroupChatLeft = ({ message, className }) => {
  return (
    <div className="message-container left">
       <UserProfilePicLeft  message={message}/>
    {message.message}
    </div>
  );
};

export default GroupChatLeft;
