import React, { useEffect } from "react";
import { useRedux } from "../../../hooks/useRedux";
import { _addToChatList } from "../../../redux/actions/friends/addToChatList";
import { _getFriends } from "../../../redux/actions/friends/getFriends";

const Right = ({ selectedUser, selectedChat }) => {
  const { dispatch, friends, account } = useRedux();

  const addToChatList = (user) => {
    dispatch(_addToChatList({receiverId:user._id }))
  }
  useEffect(() => {
    dispatch(_getFriends());
  }, []);
  return (
    <div className="right">
      {/* <ul>{friends && friends.map((user) => <li>{user.username}</li>)}</ul> */}
      <div className="uses">
        {Object.keys(friends).length > 0  ? friends.map(user =>   <div key={user._id}> 
              {user.username}

              <div onClick={() => addToChatList(user)}>Add to private Chat</div>
            </div>):<div> No friend yet</div>}
        {/* {friends  &&
         )} */}
      </div>
    </div>
  );
};

export default Right;
