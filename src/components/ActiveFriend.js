import React from "react";

const ActiveFriend = ({ image }) => {
  let activeFriends = [0, 1, 2, 3, 4,7, 32, 3232,32452]
  return (
    <div className="active-friend">
      <div className="image-active-icon">
        {activeFriends.map(friend => <div className="image">
          <img src={image} alt="" />
          <div className="active-icon"></div>
        </div> )}
        
        
      </div>
    </div>
  );
};

export default ActiveFriend;
