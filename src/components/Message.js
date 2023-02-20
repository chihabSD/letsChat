import React from "react";
import { useRedux } from "../hooks/useRedux";

const Message = ({ messages }) => {
  const { account } = useRedux();
  const messageLength = messages.length;
  return (
    <div className="message-show">
      {messages && messageLength === 0 ? (
        <div>
          <h1>No message yet</h1>
        </div>
      ) : (
        messages.map((message) =>
          message.senderId === account._id ? (
            <div className="my-message">
              <div className="image-message">
                <div className="my-text">
                  <p className="message-text"> {message.message.text} </p>
                </div>
              </div>
              <div className="time">2 Jan 2022</div>
            </div>
          ) : (
            <div className="fd-message">
              <div className="image-message-time">
                <img
                  src="/image/46668businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg"
                  alt=""
                />
                <div className="message-time">
                  <div className="fd-text">
                    <p className="message-text">I am Fine </p>
                  </div>
                  <div className="time">3 Jan 2022</div>
                </div>
              </div>
            </div>
          )
        )
      )}
    </div>
  );
};

export default Message;
