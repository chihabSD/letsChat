import React from "react";
import { FaReply } from "react-icons/fa";
import { MessageTime } from "./MessageTime";

const Reply = ({
  _id,
  handleCurrentMessageReply,
  message,
  direction,
  left,
}) => {
  
  
  return (
    <div className="reply-content">
      <div className="replyInfo">
          <FaReply className="icon"/>
          {/* ssfsdjflsdj  */}
          {message.senderId._id && message.messageId.senderId === _id
            ? "Replied to yourself"
            : `A replied to message`}
            {/* {message.senderId.username}
            {message.messageId.senderId.username} */}
        </div>
      <div
        className="parent-message"
        onClick={() => handleCurrentMessageReply(message.messageId)}
      >
        <p>

        { message.messageId.type === "image"
          ? "Replied to image above"
          :   message.messageId.message.length > 40 ? `${message.messageId.message.slice(0, 40)}...` : message.messageId.message}
        </p>
      </div>
      <div className="message-reply">
      {message.message}
        <MessageTime date={message.createdAt} right={direction} reply />
      </div>
    </div>
  );
};

export default Reply;
// import React from "react";
// import { FaReply } from "react-icons/fa";
// import { MessageTime } from "./MessageTime";
// const Reply = ({_id,  handleCurrentMessageReply, message, direction }) => {
//   return (
//     <div
//       className="message-content reply"
//       onClick={() => handleCurrentMessageReply(message.messageId)}
//     >
// //       <div className="replyInfo">
// //         <FaReply />
//         {message.senderId._id && message.messageId.senderId === _id
//           ? "Replied to yourself"
//           : `You replied to message`}
// //       </div>
//       <div className="parent-message">
//         {" "}
//         {message.messageId.type === "image"
//           ? "Replied to image above"
//           : message.messageId.message}
//       </div>
//       <div className="reply">

//       <div>Settings </div>
//         {message.message}
//         <MessageTime date={message.createdAt} right={direction} reply />
//       </div>
//       <div>Settings </div>
//     </div>
//   );
// };

// export default Reply;
