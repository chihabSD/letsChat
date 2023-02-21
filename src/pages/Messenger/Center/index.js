import React, { useEffect } from "react";
import { useRedux } from "../../../hooks/useRedux";
import { _getFriends } from "../../../redux/actions/friends/getFriends";

const Center = ({
  handleSendButton,
  selectedConversation
 ,  handleMessageInput,
}) => {

  const { loading, messages, account:{_id} } = useRedux()
// const userFound = selectedConversation.users.find(user => user._id !== _id);
  if(loading || selectedConversation == null){
    return <div>Loading</div>
  }
  return (
    <div className="center">
      <div className="messages-container">
        {/* {userFound.username} */}
        ssss
        {/* {selectedConversation.users.find(user => {
          if(user._id !== _id) {
            return (
              <div>{user.username}</div>
            )
          }
        } )} */}
        {/* { selectedConversation.users.find(user => user._id !== _id (
        user.username
      ))} */}

      </div>
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
