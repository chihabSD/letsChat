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
  _toggleMessageImagePrview,
  _toggleRightSide,
} from "../../../redux/reducers/toggler";
import EmojiBox from "./EmojiBox";
import MessageBox from "./MessageBox";
import EmptyLayout from "../../../Layouts/EmptyLayout";
import moment from "moment";
import { TimeDivider } from "./TimeDivider";
import { UserImage } from "../../../components/UserImage";
import { MessageTime } from "./MessageTime";
import MessageContents from "./MessageContents";
import MessageSetting from "./MessageSetting";
import {
  insertImagePreview,
  setCurrentMessage,
} from "../../../redux/reducers/friends";
import { _reactToMessage } from "../../../redux/actions/message/reactToMessage";
const Center = ({
  handleSendButton,
  selectedConversation,
  scrollRef,
  handleMessageInput,
  message,
  handleSend,
  selectedEmoji,
  handleImageUpload,
  imageUploading,
}) => {
  const currentMessage = React.useRef(null);
  const { ref } = useMain();
  const [reactionVisible, setReactionVisible] = useState(false);
  const [settingsModalVisbile, setSettingsModalVisible] = useState(false);
  const [selectedMessage, setSeelectedMessage] = useState(null);

  const handleImagePreview = (msg) => {
    const { imageUrl } = msg;
    dispatch(insertImagePreview({ imageUrl }));
    dispatch(_toggleMessageImagePrview());
  };
  const toggleSettingModal = () => {
    setSettingsModalVisible((prev) => !prev);
  };
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
    messageReactions,
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

  const handleMouseOver = (event) => {};
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
    setSeelectedMessage(message._id);
    toggleReactionModal();
  };
  const handleMessageAction = (message) => {
    setSeelectedMessage(message._id);
   
    toggleSettingModal();
  };
  const handleSelectedReaction = (emoji, message) => {
    const data = {
      messageId: message._id,
      reactedBy: _id,
      reaction: emoji,
    };
    // find current message reaction
    const findMessage = messageReactions.find(
      (reaction) => reaction._id === message._id
    );

    if (findMessage.reactions.length === 0) {
      console.log("empty");
      dispatch(_reactToMessage(data));
    } else {
      const findEmoji = findMessage.reactions.find((emoji) => emoji.by === _id);
      if (findEmoji === undefined) return dispatch(_reactToMessage(data));
      if (findEmoji.reaction === emoji) {
        dispatch(_reactToMessage({ ...data, current: true }));
      } else {
        dispatch(
          _reactToMessage({
            ...data,
            current: true,
            reactionId: findEmoji._id,
            replace: true,
          })
        );
      }
    }

    toggleReactionModal();
  };

  const handleSettings = (setting, message) => {
    console.log(setting, message._id);
    if (setting === "Remove") {
      // Remove the message
    }
  };
  const handleReactionUpdate = (details) => {
    console.log(details);
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
                          handleSettings={handleSettings}
                          settingsModalVisbile={settingsModalVisbile}
                          handleMessageAction={() =>
                            handleMessageAction(message)
                          }
                          handleSelectedReaction={handleSelectedReaction}
                          reactionVisible={reactionVisible}
                          settingsModalVisible={settingsModalVisbile}
                          toggleReactionModal={toggleReactionModal}
                          message={message}
                          selectedMessage={selectedMessage}
                          handleSelectedMessage={() =>
                            handleSelectedMessage(message)
                          }
                          currentMessage={currentMessage}
                          handleMouseOver={handleMouseOver}
                        />
                        <MessageContents
                          handleReactionUpdate={handleReactionUpdate}
                          toggleReactionModal={toggleReactionModal}
                          message={message}
                          direction
                          imageUploading={imageUploading}
                          handleImagePreview={handleImagePreview}
                        />
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
                        <MessageContents
                          toggleReactionModal={toggleReactionModal}
                          message={message}
                          handleReactionUpdate={handleReactionUpdate}
                          imageUploading={imageUploading}
                          handleImagePreview={handleImagePreview}
                        />

                        <MessageSetting
                          handleSettings={handleSettings}
                          handleMessageAction={handleMessageAction}
                          handleSelectedReaction={handleSelectedReaction}
                          reactionVisible={reactionVisible}
                          settingsModalVisible={settingsModalVisbile}
                          setReactionVisible={setReactionVisible}
                          toggleReactionModal={toggleReactionModal}
                          message={message}
                          selectedMessage={selectedMessage}
                          handleSelectedMessage={() =>
                            handleSelectedMessage(message)
                          }
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
