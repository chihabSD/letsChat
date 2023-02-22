import React, { useContext, useEffect } from "react";
import { IMAGE_URL } from "../../../api/endpoint";
import { ToggleContext } from "../../../contexts";
import { useMain } from "../../../hooks/useMainState";
import { useRedux } from "../../../hooks/useRedux";
import { _addToChatList } from "../../../redux/actions/friends/addToChatList";
import { _getFriends } from "../../../redux/actions/friends/getFriends";

const Right = ({ selectedUser, selectedChat,  selectedConversation }) => {
  const { dispatch, loading, conversations,   friends, account:{_id}, rightSideToggled } = useRedux();
  // const {toggleRight} = useMain()
// console.log(conversations[0].users);
  const addToChatList = (user) => {
    dispatch(_addToChatList({receiverId:user._id }))
  }

  const userFound =   selectedConversation.users.find(user => user._id !== _id);
  useEffect(() => {
    dispatch(_getFriends());
  }, []);
  return (
    <div className= {`${rightSideToggled ? 'hideright':'right'}`} >
    
      <div className="user-info">

{/* { conversations[0].users.find(user => {
  if(user._id !== _id){
    return (
      <div>{user._id}</div>
    )
  }
})} */}


      <div className="userimage">
        {/* <img src={`${IMAGE_URL}/${userFound.image}`} /> */}
        <div className="indicator"></div>
      </div>
        <h1>{userFound.username}</h1>
        {/* <h1>Chihableddine adam</h1> */}
        <p> Dublin </p>

        <p>Help peopel to build websites and apps + grows awarnes on social media </p>
    
     

     </div>
    </div>
  );
};

export default Right;
    {/* {Object.keys(friends).length > 0  ? friends.map(user =>   <div key={user._id}> 
              {user.username}

              <div onClick={() => addToChatList(user)}>Add to private Chat</div>
            </div>):<div> No friend yet</div>} */}