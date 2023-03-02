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
  // const [parentMessage, setParentMessage] = useState(null);

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
      console.log("not empty but add first ite for this user ");
      const findEmoji = findMessage.reactions.reactions.find(
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
    console.log("handle reaction update", details);
  };

  // handle reply
  // const handleSelectedReply = (msg) => {
  //   setSeelectedMessage(msg);

  //   setReply(true);
  // };
  const itemsEls = useRef(new Array());
  const handleCurrentMessageReply = (msg) => {
    // setParentMessage(msg);
    setReplyTo(msg)
    const element = document.getElementById(msg._id);
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClickScroll = () => {
    const element = document.getElementById("section-1");
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    console.log(scrollRef.current);
    //
  }, []);

  return (
    <div className="center">
      {/* {showEmojiBox  && <EmojiBox />} */}
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
                  return message.senderId._id === _id ||
                    message.senderId._id === undefined ? (
                    <div
                      id={message._id}
                      className="chat-box-container"
                      // ref={scrollRef}
                      ref={(element) => itemsEls.current.push(element)}
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
                        handleCurrentMessageReply={handleCurrentMessageReply}
                        replyTo={replyTo}
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
                          image={
                            message.contentType === "reply"
                              ? message.messageId.receiverId.image
                              : message.receiverId.image
                          }
                          style={{ width: "40px", height: "40px" }}
                        />
                      </div>
                      <MessageContents
                        handleCurrentMessageReply={handleCurrentMessageReply}
                        replyTo={replyTo}
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
              Reply to{" "}
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
              <p>{replyTo.message}</p>
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
