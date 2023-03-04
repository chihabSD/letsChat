import React, { useEffect, useRef, useState } from "react";
import { TbMessageCircleOff } from "react-icons/tb";

import { Header } from "./Header";

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
import MessageContents from "./MessageContents";
import MessageSetting from "./MessageSetting";
import { insertImagePreview } from "../../../redux/reducers/friends";
import { _reactToMessage } from "../../../redux/actions/message/reactToMessage";
import { _deleteMessage } from "../../../redux/actions/message/deleteMessage";
import Reply from "./Reply";
import DeletedMessage from "./DeletedMessage";
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
  setReplyTo,
  toggleIsReply,
  isReply,
  handleReplyTo,
  replyTo,

  handleSelectedReply,
}) => {
  const currentMessage = React.useRef(null);
  const { ref } = useMain();
  const [reactionVisible, setReactionVisible] = useState(false);
  const [settingsModalVisbile, setSettingsModalVisible] = useState(false);
  const [selectedMessage, setSeelectedMessage] = useState(null);

  const [updatingMesage, setUpdatingMessge] = useState(false);
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
    timeLines,
    dispatch,
    updatingMessage,
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

  // HANDLE REACTION SELECTION
  const handleSelectedReaction = (emoji, message) => {
    const data = {
      messageId: message._id,
      reactedBy: _id,
      reaction: emoji,
    };
    // find current message reaction
    const findMessage = messages.find(
      (reaction) => reaction._id === message._id
    );

    if (findMessage.reactions.reactions.length === 0) {
      dispatch(_reactToMessage(data));
    } else {
      const findEmoji = findMessage.reactions.reactions.find(
        (emoji) => emoji.by._id === _id
      );
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

  const handleSettings = (message) => {
    // if (setting === "Remove") {
      dispatch(_deleteMessage({ messageId: message._id }));
    // }
  };
  const handleReactionUpdate = (details) => {
    // console.log("handle reaction update", details);
  };

  const handleCurrentMessageReply = (msg) => {
    setReplyTo(msg);
    const element = document.getElementById(msg._id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Restore message
  const handleRestore = (msg) => {
    dispatch(_deleteMessage({ messageId: msg._id, restore: true }));
  };

  return (
    <div className="center">
      <Header selectedConversation={selectedConversation} />

      <div className="messages-container">
        {timeLines.length === 0 || timeLines === undefined ? (
          <EmptyLayout>
            <TbMessageCircleOff size={100} />
            <h1> No Messages</h1>
            <p>When you have message,</p>
            <p>you will see them here</p>
          </EmptyLayout>
        ) : (
          timeLines.map((timeline) => {
            const timestampDate = moment(timeline.originalDate).format(
              "dd/MM/yyyy"
            );

            return (
              <div className="timeline-container" key={timeline.timeLine}>
                {timeline.messages.map((message) => {
                  const { contentType } = message;
                  let condition =
                    message.deletedBy !== undefined &&
                    message.deletedBy.length > 0 &&
                    message.deletedBy.find((user) => user.by == _id);

                  const className = "chat-box-container";
                  return message.senderId._id === _id ||
                    message.senderId._id === undefined ? (
                    <div
                      id={message._id}
                      className={className}
                      // className={
                      //   contentType === "reply"
                      //     ? "chat-box-container hidesettings"
                      //     : condition
                      //     ? "chat-box-container hidesettings"
                      //     : className
                      // }
                      ref={scrollRef}
                      // ref={(element) => itemsEls.current.push(element)}
                      key={message._id}
                    >
                      {condition ? (
                        <div className="message-container">
                          <DeletedMessage
                            message={message}
                            _id={_id}
                            handleRestore={handleRestore}
                          />
                        </div>
                      ) : (
                        contentType === "message" && (
                          <div className="message-container">
                            <MessageSetting
                              handleSelectedReply={() =>
                                handleSelectedReply(message)
                              }
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
                              handleRestore={handleRestore}
                              handleCurrentMessageReply={
                                handleCurrentMessageReply
                              }
                              replyTo={replyTo}
                              handleReactionUpdate={handleReactionUpdate}
                              toggleReactionModal={toggleReactionModal}
                              message={message}
                              direction
                              imageUploading={imageUploading}
                              handleImagePreview={handleImagePreview}
                            />
                          </div>
                        )
                      )}
                      {contentType == "reply" && (
                        <div className="reply-container">
                          <Reply
                            _id={_id}
                            message={message}
                            handleCurrentMessageReply={
                              handleCurrentMessageReply
                            }
                            direction
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      className="chat-box-container left"
                      ref={scrollRef}
                      key={message._id}
                    >
                      
                      {contentType == "reply" && (
                        <div className="reply-container left">
                         <div className="left">
                            <UserImage
                              image={
                                message.contentType === "reply"
                                  ? message.messageId.receiverId.image
                                  : message.receiverId.image
                              }
                              style={{ width: "40px", height: "40px" }}
                            />
                          </div>
                          <Reply
                            _id={_id}
                            message={message}
                            handleCurrentMessageReply={
                              handleCurrentMessageReply
                            }
                            direction
                          />
                        </div>
                      )}
                      
                      {condition ? (
                        <div className="message-container">
                        <DeletedMessage
                          message={message}
                          _id={_id}
                          handleRestore={handleRestore}
                        />
                      </div>
                      ) :
                      contentType === "message" && (
                        <div className="message-container">
                          <div className="left">
                            <UserImage
                              image={
                                message.contentType === "reply"
                                  ? message.messageId.receiverId.image
                                  : message.receiverId.image
                              }
                              style={{ width: "40px", height: "40px" }}
                            />
                          </div>
                          <MessageContents
                            handleCurrentMessageReply={
                              handleCurrentMessageReply
                            }
                            replyTo={replyTo}
                            toggleReactionModal={toggleReactionModal}
                            message={message}
                            handleReactionUpdate={handleReactionUpdate}
                            imageUploading={imageUploading}
                            handleImagePreview={handleImagePreview}
                            handleRestore={handleRestore}
                          />

                          <MessageSetting
                            handleSelectedReply={() =>
                              handleSelectedReply(message)
                            }
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
                      )
                      
                      }

                      
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
        <div className="bottom-reply-container">
          <div className="top">
            <p>
              Reply to
              <span>
                {replyTo.senderId._id === _id
                  ? "yourself"
                  : `${replyTo.senderId.username}`}
              </span>{" "}
            </p>
            <p className="close" onClick={toggleIsReply}>
              X
            </p>
          </div>
          {replyTo ? (
            replyTo.type === "text" ? (
              <p>{replyTo.message.length > 40 ? `${replyTo.message.slice(0, 40)}...`: replyTo.message}</p>
            ) : (
              <p>Reply to Image</p>
            )
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
