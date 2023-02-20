import React from "react";
import { FaPhoneAlt, FaVideo, FaRocketchat } from "react-icons/fa";
import { IMAGE_URL } from "../api/endpoint";
import FriendInfo from "./FriendInfo";
import Message from "./Message";
import MessageSend from "./MessageSend";
import ProfileImage from "./ProfileImage";
const RightSide = ({
  currentFriend,

  messages, 
  inputHandle,
  newMessage,
  sendMessage , 
  scrollRef
}) => {
  const { username, image } = currentFriend;
  return (
    <div className="col-9">
      <div className="right-side">
        <input type="checkbox" id="dot" />
        <div className="row">
          <div className="col-8">
            <div className="message-send-show">
              <div className="header">
                <div className="image-name">
                  <div className="image">
                    <ProfileImage image={image}/>
                  </div>
                  <div className="name">
                    <h3> {username}</h3>
                  </div>
                </div>

                <div className="icons">
                  <div className="icon">
                    <FaPhoneAlt />
                  </div>

                  <div className="icon">
                    <FaVideo />
                  </div>

                  <div className="icon">
                    {/* <FaRocketchat/> */}
                    <label htmlFor="dot">
                      {" "}
                      <FaRocketchat />{" "}
                    </label>
                  </div>
                </div>
              </div>
              <Message scrollRef={scrollRef} messages={messages}/>
              <MessageSend 
              
              inputHandle={inputHandle}
              newMessage={newMessage}
              sendMessage ={sendMessage }
              />
            </div>
          </div>

          <div className="col-4">
            {/* User About Page  */}
            <FriendInfo currentFriend={currentFriend} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
