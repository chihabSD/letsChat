import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineExpand } from "react-icons/ai";
import { GrExpand } from "react-icons/gr";
import { BsArrowLeft } from "react-icons/bs";
import { TbMessageCircle, TbMessageCircleOff } from "react-icons/tb";
import { Oval } from "react-loader-spinner";
import { emojis } from "../../../data";
import { Header } from "./Header";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useMain } from "../../../hooks/useMainState";
import { useRedux } from "../../../hooks/useRedux";
import { _getFriends } from "../../../redux/actions/friends/getFriends";
import {
  _toggleEmojiBox,
  _toggleRightSide,
} from "../../../redux/reducers/toggler";
import EmojiBox from "./EmojiBox";
import MessageBox from "./MessageBox";
import EmptyLayout from "../../../Layouts/EmptyLayout";
import MessageRight from "./MessageRight";
import { MessageLeft } from "./MessageLeft";
import moment from "moment";
import ChatController from "./ChatController";
import { MessageTime } from "./MessageTime";
const Center = ({
  handleSendButton,
  selectedConversation,
  scrollRef,
  handleMessageInput,
  message,
  selectedEmoji
}) => {
  const { ref } = useMain();
  useClickOutside(ref, () => {
    dispatch(_toggleEmojiBox());
  });
  const {
    messages,
    dispatch,
    emojiBoxyToggled,
    account: { _id },
  } = useRedux();

 
  const dates = new Set();
  const renderDate = (chat, dateNum) => {
    // const timestampDate = moment(chat.createdAt).format('MMMM Do YYYY, h:mm:ss a');
    const timestampDate = moment(chat.createdAt).format('LLL');
    // Add to Set so it does not render again
    dates.add(dateNum);

    return <MessageTime date={timestampDate}/>;
  };



  
  return (
    <div className="center">
      {/* {showEmojiBox  && <EmojiBox />} */}
      <Header selectedConversation={selectedConversation} />

      <div className="messages-container">
        {
          messages.length === 0 || messages === undefined ? (
            <EmptyLayout>
              <TbMessageCircleOff size={100} />
              <h1> No Messages</h1>
              <p>When you have message,</p>
              <p>you will see them here</p>
            </EmptyLayout>
          ) : 
          messages.map(message => {
            const timestampDate = moment(message.createdAt).format("dd/MM/yyyy");
            return (
              <div className="message-container">
             <ChatController scrollRef={scrollRef} key={message._id} message={message}/> 
                {dates.has(timestampDate) ? null : renderDate(message, timestampDate)}
              </div>
            )
          })
          
        }
      </div>

      <MessageBox
        message={message}
        handleMessageInput={handleMessageInput}
        handleSendButton={handleSendButton}
      >
        {emojiBoxyToggled && <EmojiBox el={ref} selectedEmoji={selectedEmoji} />}
      </MessageBox>
    </div>
  );
};

export default Center;

// import React, { useEffect, useRef, useState } from "react";
// import { AiOutlineClose, AiOutlineExpand } from "react-icons/ai";
// import { GrExpand } from "react-icons/gr";
// import { BsArrowLeft } from "react-icons/bs";
// import { TbMessageCircle, TbMessageCircleOff } from "react-icons/tb";
// import { Oval } from "react-loader-spinner";
// import { emojis } from "../../../data";
// import { useClickOutside } from "../../../hooks/useClickOutside";
// import { useMain } from "../../../hooks/useMainState";
// import { useRedux } from "../../../hooks/useRedux";
// import { _getFriends } from "../../../redux/actions/friends/getFriends";
// import {
//   _toggleEmojiBox,
//   _toggleRightSide,
// } from "../../../redux/reducers/toggler";
// import EmojiBox from "./EmojiBox";
// import MessageBox from "./MessageBox";
// import MessagesLoader from "./MessagesLoader";
// import EmptyLayout from "../../../Layouts/EmptyLayout";
// import MessageRight from "./MessageRight";
// import { MessageLeft } from "./MessageLeft";
// const Center = ({
//   handleSendButton,
//   selectedConversation,
//   scrollRef,
//   handleMessageInput,
//   message,
// }) => {
//   const { ref } = useMain();
//   useClickOutside(ref, () => {
//     dispatch(_toggleEmojiBox());
//   });
//   const {
//     loading,
//     messages,
//     rightSideToggled,
//     dispatch,
//     emojiBoxyToggled,
//     account: { _id },
//   } = useRedux();
//   const notReady = loading || selectedConversation == null;
//   return (
//     <div className="center">
//       {/* {showEmojiBox  && <EmojiBox />} */}
//       <div className="chat-header">
//         {notReady
//           ? "Not ready"
//           : selectedConversation.users.map((user) => {
//               if (user._id !== _id) return user.username;
//             })}
//         <div className="chat-header-right">
//           <div onClick={() => dispatch(_toggleRightSide())}>
//             {rightSideToggled && (
//               <div className="expand-toggle">
//                 <BsArrowLeft size={25} />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="messages-container">
//         {/* {emojis.map(emoji => <div>{emoji}</div>)} */}
//         {/* <EmojiBox /> */}
//         {notReady ? (
//           <MessagesLoader />
//         ) : messages.length === 0 || messages === undefined ? (
//           <EmptyLayout>
//             <TbMessageCircleOff size={100} />
//             <h1> No Messages</h1>
//             <p>When you have message,</p>
//             <p>you will see them here</p>
//           </EmptyLayout>
//         ) : (
//           messages.map((message) =>
//             message.senderId._id === _id ||
//             message.senderId._id === undefined ? (
//               <MessageRight
//                 message={message}
//                 key={message._id}
//                 scrollRef={scrollRef}
//               />
//             ) : (
//               // <ChatBubble
//               //   key={message._id}
//               //   scrollRef={scrollRef}
//               //   right
//               //   message={message}
//               // />
//               <MessageLeft
//                 message={message}
//                 key={message._id}
//                 scrollRef={scrollRef}
//               />
//               // <ChatBubble
//               //   key={message._id}
//               //   scrollRef={scrollRef}
//               //   message={message}
//               // />
//             )
//           )
//         )}
//       </div>

//       <MessageBox
//         message={message}
//         handleMessageInput={handleMessageInput}
//         handleSendButton={handleSendButton}
//       >
//         {emojiBoxyToggled && <EmojiBox el={ref} />}
//       </MessageBox>
//     </div>
//   );

// };

// export default Center;
