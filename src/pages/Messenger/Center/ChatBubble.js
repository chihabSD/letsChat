import React from "react";
import { IMAGE_URL } from "../../../api/endpoint";

const ChatBubble = ({ right, message, scrollRef }) => {
  console.log(message);
  return (
    <div  className={`${right ? "chat-bubble-container" : "chat-bubble-container-left"}`}>
    <div className="top">
      <div className="left">

      {!right && (
        <div className="userPic">
          <img src={`${IMAGE_URL}/${message.senderId.image}`} />
        </div>
      )}
      
     
      </div>
     
      <div className="message-contents"> <p>{right ? message.message.text : message.message.text}</p></div>
    </div>
    {/* END OF TOP */}
    <div className="bottom">
      <p>Wed 9.22 AM</p>
    </div>
    </div>

    // <div
    //   className={`${right ? "chat-bubble" : "chat-bubble-left"}`}
    //   ref={scrollRef}
    // >
    //   {!right && (
    //     <div className="receiver-image">
    //       <img src={`${IMAGE_URL}/${message.senderId.image}`} />
    //     </div>
    //   )}
    //   <div className="message-contents">
    //     <p>{right ? message.message.text : message.message.text}</p>
    //   </div>
    //   <h3> Time </h3>
    // </div>
    // <div className="bubble-container">

    // </div>
  );
};

export default ChatBubble;
