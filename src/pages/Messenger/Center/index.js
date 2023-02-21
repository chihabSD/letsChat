import React, { useEffect } from "react";
import { useRedux } from "../../../hooks/useRedux";
import { _getFriends } from "../../../redux/actions/friends/getFriends";

const Center = ({
  handleSendButton,
  selectedConversation
 ,  handleMessageInput,
}) => {

  return (
    <div className="center">
      <div className="messages-container">{selectedConversation._id}</div>
      <div className="messages-send-box">
        <input
          type="text"
          placeholder="Enter something"
          name="message"
          onChange={handleMessageInput}
        />
        <button onClick={()=>handleSendButton()}>Send </button>
      </div>
    </div>
  );
};

export default Center;
