import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineExpand } from "react-icons/ai";
import { GrExpand } from "react-icons/gr";
import { BsArrowLeft } from "react-icons/bs";
import { TbMessageCircle, TbMessageCircleOff } from "react-icons/tb";
import { Oval } from "react-loader-spinner";
import { emojis } from "../../../data";
import { Header } from "./Header";

import { BsReply } from "react-icons/bs";
import { FaSmile } from "react-icons/fa";
import { TbDotsVertical } from "react-icons/tb";

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
import { TimeDivider } from "./TimeDivider";
import { UserImage } from "../../../components/UserImage";
import { MessageTime } from "./MessageTime";
import MessageContents from "./MessageContents";
import MessageSetting from "./MessageSetting";
const Center = ({
  handleSendButton,
  selectedConversation,
  scrollRef,
  handleMessageInput,
  message,
  handleSend, 
  selectedEmoji,
  handleImageUpload
}) => {
  const currentMessage = React.useRef(null);
  const { ref } = useMain();
  const [reactionVisible, setReactionVisible] = useState(true);
  const [selectedMessage, setSeelectedMessage] = useState(null);

  const toggleReactionModal = () => {
    setReactionVisible((prev) => !prev);
  };

  useClickOutside(ref, () => {
    dispatch(_toggleEmojiBox());
  });
  useClickOutside(currentMessage, () => {
    // toggleReactionModal()
    setReactionVisible(false);
  });
  const {
    messages,
    dispatch,
    emojiBoxyToggled,
    account: { _id },
  } = useRedux();

  const selectedItem = (item) => {
    console.log(item);
    toggleReactionModal();
  };

  const handleMouseEnter = () => {
    console.log(currentMessage);
  };

  const handleMouseOver = (event) => {
    // console.log(JSON.parse(event.target.dataset.info));
    // setReactionVisible(false)
  };
  useEffect(() => {
    if (selectedMessage === null) {
      return;
    }
    // console.log(selectedMessage, reactionVisible);
  }, [selectedMessage]);

  const handleHandleMouseLeave = () => {
    // setReactionVisible(false)
    // setSeelectedMessage(null)
  };
  const handleSelectedMessage = (message) => {
    console.log(message);
    setSeelectedMessage(message._id);
    toggleReactionModal();
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
          ) : (
            messages.map((timeline) => {
              const timestampDate = moment(timeline.originalDate).format(
                "dd/MM/yyyy"
              );

              return (
                <div className="timeline-container" key={timeline.timeLine}>
                  {timeline.messages.map((message) => {
                    return message.senderId._id === _id ||
                      message.senderId._id === undefined ? (
                      <div
                        className="chat-box-container"
                        ref={scrollRef}
                        key={message._id}
                      >
                        <MessageSetting
                          reactionVisible={reactionVisible}
                          toggleReactionModal={toggleReactionModal}
                          message={message}
                          selectedMessage={selectedMessage}
                          handleSelectedMessage={()=>handleSelectedMessage(message)}
                          currentMessage={currentMessage}
                          handleMouseOver={handleMouseOver}
                        />
                          <MessageContents message={message} direction />
                        {/* <div className="details hidden">
                          <div className="item">
                            <TbDotsVertical />
                          </div>
                          <div className="item">
                            <BsReply />
                          </div>
                          <div className="item">
                            <FaSmile
                              className="icon"
                              onClick={() => handleSelectedMessage(message)}
                            />
                          </div>
                          {reactionVisible &&
                          selectedMessage === message._id ? (
                            <div
                              className="reactions-container"
                              ref={currentMessage}
                              onMouseOver={handleMouseOver}
                            >
                              <div className="item">
                                <TbDotsVertical />
                              </div>
                              <div className="item">
                                <BsReply />
                              </div>
                              <div className="item">
                                <FaSmile onClick={toggleReactionModal} />
                              </div>

                              <div className="item">
                                <FaSmile onClick={toggleReactionModal} />
                              </div>

                              <div className="item">
                                <FaSmile onClick={toggleReactionModal} />
                              </div>

                              <div className="item">
                                <FaSmile onClick={toggleReactionModal} />
                              </div>

                              <div className="item">
                                <FaSmile onClick={toggleReactionModal} />
                              </div>
                            </div>
                          ) : null}
                        </div> */}

                      
                      </div>
                    ) : (
                      <div
                        className="chat-box-container left"
                        ref={scrollRef}
                        key={message._id}
                      >
                        <div className="userimage-container">
                          <UserImage
                            image={message.receiverId.image}
                            style={{ width: "40px", height: "40px" }}
                          />
                        </div>
                        <MessageContents message={message}  />

                        <MessageSetting
                          reactionVisible={reactionVisible}
                          toggleReactionModal={toggleReactionModal}
                          message={message}
                          selectedMessage={selectedMessage}
                          handleSelectedMessage={()=>handleSelectedMessage(message)}
                          currentMessage={currentMessage}
                          handleMouseOver={handleMouseOver}
                        />
                      </div>
                    );
                  })}
                  <TimeDivider date={timestampDate} />
                </div>
              );
            })
          )

          // messages.map((message) => {
          //   const timestampDate = moment(message.createdAt).format(
          //     "dd/MM/yyyy"
          //   );
          //   return (
          //     <div
          //       className="message-container"
          //       // onMouseOver={handleMouseEnter}
          //       ref={currentMessage}
          //       data-info={JSON.stringify(message)}
          //       onClick={() => console.log(message)}
          //       onMouseOver={handleMouseOver}
          //     >
          //       <ChatController
          //         selectedItem={selectedItem}
          //         // handleMouseEnter={handleMouseEnter}
          //         currentMessage={currentMessage}
          //         toggleReactionModal={toggleReactionModal}
          //         reactionVisible={reactionVisible}
          //         scrollRef={scrollRef}
          //         key={message._id}
          //         message={message}
          //       />
          //       {dates.has(timestampDate)
          //         ? null
          //         : renderDate(message, timestampDate)}
          //     </div>
          //   );
          // }

          // )
        }
      </div>

      <MessageBox
      handleImageUpload={handleImageUpload}
      handleSend={handleSend}
        message={message}
        handleMessageInput={handleMessageInput}
        handleSendButton={handleSendButton}
      >
        {emojiBoxyToggled && (
          <EmojiBox el={ref} selectedEmoji={selectedEmoji} />
        )}
      </MessageBox>
    </div>
  );
};

export default Center;

/*************************************************************** */
// import React, { useEffect, useRef, useState } from "react";
// import { AiOutlineClose, AiOutlineExpand } from "react-icons/ai";
// import { GrExpand } from "react-icons/gr";
// import { BsArrowLeft } from "react-icons/bs";
// import { TbMessageCircle, TbMessageCircleOff } from "react-icons/tb";
// import { Oval } from "react-loader-spinner";
// import { emojis } from "../../../data";
// import { Header } from "./Header";
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
// import EmptyLayout from "../../../Layouts/EmptyLayout";
// import MessageRight from "./MessageRight";
// import { MessageLeft } from "./MessageLeft";
// import moment from "moment";
// import ChatController from "./ChatController";
// import { TimeDivider } from "./TimeDivider";
// const Center = ({
//   handleSendButton,
//   selectedConversation,
//   scrollRef,
//   handleMessageInput,
//   message,
//   selectedEmoji,
// }) => {
//   const currentMessage = React.useRef(null);
//   const { ref } = useMain();
//   const [reactionVisible, setReactionVisible] = useState(true);
//   const [selectedMessage, setSeelectedMessage] = useState(null);

//   const toggleReactionModal = () => {
//     setReactionVisible((prev) => !prev);
//   };

//   // useClickOutside(ref, () => {
//   //   dispatch(_toggleEmojiBox());
//   // });
//   useClickOutside(currentMessage, () => {
//     console.log('use click is called');
//     // toggleReactionModal()
//     // setReactionVisible(false)
//     console.log('closed');
//   })
//   const {
//     messages,
//     dispatch,
//     emojiBoxyToggled,
//     account: { _id },
//   } = useRedux();

//   const dates = new Set();
//   const renderDate = (chat, dateNum) => {
//     // const timestampDate = moment(chat.createdAt).format('MMMM Do YYYY, h:mm:ss a');
//     const timestampDate = moment(chat.createdAt).format("LLL");
//     // Add to Set so it does not render again
//     dates.add(dateNum);

//     return <TimeDivider date={timestampDate} />;
//   };
//   const selectedItem = (item) => {
//     console.log(item);
//     toggleReactionModal();
//   };

//   const handleMouseEnter = () => {
//     console.log(currentMessage);
//   };

//   const handleMouseOver = (event) => {
//     console.log(JSON.parse(event.target.dataset.info));
//   };
// useEffect(() => {

//   if(selectedMessage === null) {
//     return
//   }
//   console.log(selectedMessage, reactionVisible);
// }, [selectedMessage])

// const listener = () => {

// }
// const handleHandleMouseLeave = () => {
//   // setReactionVisible(false)
//   // setSeelectedMessage(null)
// }

//   return (
//     <div className="center">
//       {/* {showEmojiBox  && <EmojiBox />} */}
//       <Header selectedConversation={selectedConversation} />

//       <div className="messages-container">
//         {messages.length === 0 || messages === undefined ? (
//           <EmptyLayout>
//             <TbMessageCircleOff size={100} />
//             <h1> No Messages</h1>
//             <p>When you have message,</p>
//             <p>you will see them here</p>
//           </EmptyLayout>
//         ) : (
//           messages.map(message => (
//             <div  className={`${selectedMessage === message._id ? 'text-container selected':'text-container'}`}
//             // data-info={JSON.stringify(message)}
//             onMouseEnter= {()=> setSeelectedMessage(message._id)}
//             onMouseLeave={handleHandleMouseLeave}
//             // onMouseOver={handleMouseOver

//             // }
//             >
//               {/* {reactionVisible && selectedMessage === message._id ? <div ref={currentMessage} className="modal-container"> Modal here </div>:null } */}
//               {reactionVisible ? <div ref={currentMessage} className="modal-container"> Modal here </div>:null }
//               {/* {reactionVisible && <div className={`${selectedMessage === message._id ? 'selected-modal':"modal-container"}`} > Modal </div>} */}
//               <div className="action" onClick={toggleReactionModal}>Display Modals
//               </div>
//               {message.message.text}</div>
//           ))
//           // messages.map((message) => {
//           //   const timestampDate = moment(message.createdAt).format(
//           //     "dd/MM/yyyy"
//           //   );
//           //   return (
//           //     <div
//           //       className="message-container"
//           //       // onMouseOver={handleMouseEnter}
//           //       ref={currentMessage}
//           //       data-info={JSON.stringify(message)}
//           //       onClick={() => console.log(message)}
//           //       onMouseOver={handleMouseOver}
//           //     >
//           //       <ChatController
//           //         selectedItem={selectedItem}
//           //         // handleMouseEnter={handleMouseEnter}
//           //         currentMessage={currentMessage}
//           //         toggleReactionModal={toggleReactionModal}
//           //         reactionVisible={reactionVisible}
//           //         scrollRef={scrollRef}
//           //         key={message._id}
//           //         message={message}
//           //       />
//           //       {dates.has(timestampDate)
//           //         ? null
//           //         : renderDate(message, timestampDate)}
//           //     </div>
//           //   );
//           // }

//         )}
//       </div>

//       <MessageBox
//         message={message}
//         handleMessageInput={handleMessageInput}
//         handleSendButton={handleSendButton}
//       >
//         {emojiBoxyToggled && (
//           <EmojiBox el={ref} selectedEmoji={selectedEmoji} />
//         )}
//       </MessageBox>
//     </div>
//   );
// };

// export default Center;
