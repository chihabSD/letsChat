import React, {  useContext, useState } from "react";
import { GrClose } from "react-icons/gr";
import { UserImage } from "../components/UserImage";
import { CenterContext } from "../contexts";
import { useRedux } from "../hooks";
// import { useRedux } from "../hooks/useRedux";
const MessageReaction = () => {
  const {
    dispatch,
    currentMessageReactions,
    account: { image },
  } = useRedux();
  const [selectedOpton, setSeelectedOpton] = useState("All");
  const options = ["All", "emojis"];
  const handleSelectedOpton = (option) => {
    setSeelectedOpton(option);
  };

  const {  toggleMessageReactions } = useContext(CenterContext);
  return (
    <div className="message-reactions-modal">
      <div className="message-reactions-modal-inner">
        <header>
          <div className="title">
            <h1>Message reactions</h1>
          </div>
          <div
            className="closeBtn"
            onClick={toggleMessageReactions}
          >
            <GrClose color="white" />
          </div>
        </header>
        <div className="content">
          <div className="tabs">
            {options.map((option) => {
              return (
                <div
                  key={option}
                  className={`${
                    selectedOpton === null
                      ? "options"
                      : selectedOpton === option
                      ? "options selected"
                      : "options"
                  }`}
                  onClick={() => handleSelectedOpton(option)}
                >
                  {/* <div className="tab">{option}</div> */}
                  {option}
                </div>
              );
            })}
          </div>
          <div className="data">
            {currentMessageReactions === null
              ? null
              : currentMessageReactions.reactions.reactions.map((reaction) => {
                  return (
                    <div className="reaction">
                      <div className="left">
                        <UserImage image={reaction.by.image} />
                        <h1>{reaction.by.username}</h1>
                      </div>
                      <div>{reaction.reaction}</div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageReaction;

