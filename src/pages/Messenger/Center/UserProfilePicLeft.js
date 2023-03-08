import React from "react";
import { UserImage } from "../../../components/UserImage";
const UserProfilePicLeft = ({ message }) => {
  return (
    <UserImage
      image={
        message.contentType === "reply"
          ? message.messageId.receiverId.image
          : message.senderId.image
      }
      style={{ width: "40px", height: "40px" }}
    />
  );
};

export default UserProfilePicLeft;
