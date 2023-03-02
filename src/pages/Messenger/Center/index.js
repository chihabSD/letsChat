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
  const [isReply, setReply] = useState(false);

  const toggleIsReply = () => setReply((p) => !p);
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
      dispatch(_reactToMessage(data));
    } else {
      console.log("not empty but add first ite for this user ");
      const findEmoji = findMessage.reactions.find(
        (emoji) => emoji.by._id === _id
      );
      if (findEmoji === undefined) return dispatch(_reactToMessage(data));
      if (findEmoji.reaction === emoji) {
        dispatch(_reactToMessage({ ...data, current: true }));
      } else {
        console.log("Replace current emoji");
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

  // handle reply
  const handleSelectedReply = (msg) => {
    setSeelectedMessage(msg);
    // console.log(selectedMessage);
    // toggleIsReply()
    setReply(true);
  };
  return (
    <div className="center">
      {/* {showEmojiBox  && <EmojiBox />} */}
      <Header selectedConversation={selectedConversation} />

      <div className="messages-container">
        {messages.length === 0 || messages === undefined ? (
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
                        handleSelectedReply={() => handleSelectedReply(message)}
                        handleSettings={handleSettings}
                        settingsModalVisbile={settingsModalVisbile}
                        handleMessageAction={() => handleMessageAction(message)}
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
                        handleSelectedReply={() => handleSelectedReply(message)}
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
        )}
      </div>

      {isReply && (
        <div className="reply-container">
          <div className="top">
            <p>
              Reply to <span>{selectedMessage.senderId._id === _id ? "yourself":`${selectedMessage.senderId.username}`}</span>{" "}
            </p>
            <p className="close" onClick={toggleIsReply}>
              X
            </p>
          </div>
          {/* <p> {selectedMessage && isReply ? `${selectedMessage.message}`:null}</p> */}
          {selectedMessage ? (
            selectedMessage.type === "text" ? (
              <p>{selectedMessage.message}</p>
            ) : <p>Reply to Image</p>
          ) : null}
        </div>
      )}
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
