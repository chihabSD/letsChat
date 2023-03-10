import React, { useContext } from "react";
import ReplyBottom from "./ReplyBottom";
import { Header } from "./Header";

import { useClickOutside } from "../../../hooks/useClickOutside";
import { useMain } from "../../../hooks/useMainState";
import { useCenter } from "../../../hooks/useCenterState";
import { useRedux } from "../../../hooks/useRedux";
import {
  _toggleEmojiBox,
  _toggleMessageImagePrview,
  _toggleRightSide,
} from "../../../redux/reducers/toggler";
import EmojiBox from "./EmojiBox";
import MessageBox from "./MessageBox";
import moment from "moment";
import { TimeDivider } from "./TimeDivider";
import { UserImage } from "../../../components/UserImage";
import MessageContents from "./MessageContents";
import MessageSetting from "./MessageSetting";
import { _reactToMessage } from "../../../redux/actions/message/reactToMessage";
import { _deleteMessage } from "../../../redux/actions/message/deleteMessage";
import Reply from "./Reply";
import DeletedMessage from "./DeletedMessage";
import UserProfilePicLeft from "./UserProfilePicLeft";
import { CenterContext, ConversationContext } from "../../../contexts";
import NoMessage from "./NoMessage";
import { findCurrentUserDetails } from "../../../helpers/findMethods";
import ContentsHidden from "./ContentsHidden";
import { groupMessages } from "../../../helpers/groupMessages";
import ImagePreview from "../../../Modals/ImagePreview";
import { useModal } from "../../../hooks";
import MessageReaction from "../../../Modals/MessageReaction";
const Center = () => {
  const {
    messages,
    dispatch,
    selectedConversation,
    emojiBoxyToggled,
    account: { _id },
  } = useRedux();

  const { handleSelectedReply, scrollRef, replyTo, isReply, setReplyTo } =
    useContext(ConversationContext);
  const { ref } = useMain();
  const {
    imagePreviewVisible,
    toggleImagePreview,
    messageReactionVisible,
    toggleMessageReactions,
  } = useModal();
  const {
    currentMessage,
    toggleReactionModal,
    reactionVisible,
    setReactionVisible,
    handleMessageAction,
    handleSelectedMessage,
    selectedMessage,
    handleSettings,
    handleRestore,
  } = useCenter();

  useClickOutside(ref, () => {
    dispatch(_toggleEmojiBox());
  });
  useClickOutside(currentMessage, () => {
    setReactionVisible(false);
  });

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

  const handleCurrentMessageReply = (msg) => {
    setReplyTo(msg);
    const element = document.getElementById(msg._id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (findCurrentUserDetails(selectedConversation, _id).isLeft) {
    return <ContentsHidden selectedConversation={selectedConversation} />;
  }

  if (messages.length === 0) {
    return (
      <div className="center">
        <div className="messages-container">
          <NoMessage />
          <MessageBox>{emojiBoxyToggled && <EmojiBox el={ref} />}</MessageBox>
        </div>
      </div>
    );
  }

  let timeLines = groupMessages(messages);

  return (
    <CenterContext.Provider
      value={{
        handleSettings,
        handleCurrentMessageReply,
        currentMessage,
        handleSelectedReaction,
        reactionVisible,
        selectedMessage,
        handleSelectedReply,
        handleRestore,
        handleMessageAction,
        handleSelectedMessage,

        // image preveiw
        toggleImagePreview,
        // message reactions
        messageReactionVisible,

        toggleMessageReactions,
      }}
    >
      {imagePreviewVisible && <ImagePreview />}
      {messageReactionVisible && <MessageReaction />}
      <div className="center">
        <Header />

        <div className="messages-container">
          {timeLines.map((timeline) => {
            const timestampDate = moment(timeline.originalDate).format(
              "dd/MM/yyyy"
            );
            // const timestampDate =

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
                      ref={scrollRef}
                      key={message._id}
                    >
                      {condition ? (
                        <div className="message-container">
                          <DeletedMessage message={message} _id={_id} />
                        </div>
                      ) : (
                        contentType === "message" && (
                          <div className="message-container">
                            <MessageSetting message={message} />
                            <MessageContents message={message} direction />
                          </div>
                        )
                      )}
                      {contentType == "reply" && (
                        <div className="reply-container">
                          <Reply _id={_id} message={message} direction />
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
                                  ? message.senderId.image
                                  : message.senderId.image
                              }
                              style={{ width: "40px", height: "40px" }}
                            />
                          </div>
                          <Reply _id={_id} message={message} direction />
                        </div>
                      )}

                      {condition ? (
                        <div className="message-container">
                          <DeletedMessage message={message} _id={_id} />
                        </div>
                      ) : (
                        contentType === "message" && (
                          <div className="message-container">
                            <UserProfilePicLeft message={message} />
                            <MessageContents message={message} />
                            <MessageSetting message={message} />
                          </div>
                        )
                      )}
                    </div>
                  );
                })}
                <TimeDivider timeline={timeline.originalDate} />
              </div>
            );
          })}
        </div>

        {/* BOTTOM REPLY BOX  */}
        {isReply && <ReplyBottom _id={_id} replyTo={replyTo} />}

        {/* MESSAGE BOX TO SEND MESSAGE  */}
        <MessageBox>{emojiBoxyToggled && <EmojiBox el={ref} />}</MessageBox>
      </div>
    </CenterContext.Provider>
  );
};

export default Center;
