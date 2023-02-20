import React from "react";
import { FaCaretSquareDown, FaEdit, FaSistrix } from "react-icons/fa";
import { IMAGE_URL } from "../api/endpoint";

const FriendInfo = ({ currentFriend }) => {
  const others = [
    { id: 0, name: "Customise chat" },
    { id: 2, name: "Privacy and support" },
    { id: 3, name: "Shared media" },
  ];
  return (
    <div className="friend-info">
      <input type="checkbox" id="gallery" />
      <FriendInfoTop currentFriend={currentFriend} />

      <div className="others">
        {others.map((other) => (
          <div key={other.id} className="privacy">
            <h3>{other.name} </h3>
            <FaCaretSquareDown />
          </div>
        ))}
      </div>

      <div className="gallery">
        <img src="/image/20003ariyan.jpg" alt="" />
        <img src="/image/20003ariyan.jpg" alt="" />
        <img src="/image/20003ariyan.jpg" alt="" />
        <img src="/image/20003ariyan.jpg" alt="" />
      </div>
    </div>
  );
};

// Friend top
const FriendInfoTop = ({ currentFriend }) => {
  return (
    <div className="image-name">
      <div className="image">
        <img src={`${IMAGE_URL}/${currentFriend.image}`} alt="" />
      </div>
      <div className="active-user">Active</div>

      <div className="name">
        <h4> {currentFriend.username}</h4>
      </div>
    </div>
  );
};
const Other = () => {
  return <div></div>;
};
export default FriendInfo;
