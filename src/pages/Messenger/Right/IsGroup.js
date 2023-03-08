import React from "react";
import { BsChevronRight } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { UserImage } from "../../../components/UserImage";
import { useRedux } from "../../../hooks/useRedux";
import { _deleteConversation } from "../../../redux/actions/friends/deleteConversation";
import { _updateConversationUser } from "../../../redux/actions/friends/updateConversationUser";
import { _toggleRightSide } from "../../../redux/reducers/toggler";

const IsGroup = () => {
  const { rightSideToggled, dispatch, selectedConversation } = useRedux();

  const { groupName,  members } = selectedConversation;
  return (
    <div className={`${rightSideToggled ? "hideright" : "right"}`}>
      <header>
        <div
          className="icon-close"
          onClick={() => dispatch(_toggleRightSide())}
        >
          <GrClose />
        </div>
        <h1>Group info </h1>
      </header>
      <div className="info">
        <div className="info-top">
          <div className="info-pic">Info pic</div>
          <div className="details">
            <h1>{groupName ? groupName : "No group name yet!"}</h1>
            <h1> Group : {members.length} </h1>
          </div>
        </div>

        <div className="info-bottom">
          <div className="users">
            <p>{members.length} participants</p>
            {members.map(({user, role}) => {
          
              // const matchAdmins = admins.find((admin) => admin._id == user._id);
              return (
                <div className="user" key={user._id}>
                  <div className="left">
                    <div className="left-left">
                    <UserImage image={user.image}/>
                    </div>
                    <div className="left-right">
                      <h1>{user.username}</h1>
                      <h1>{role == 'admin' && "Admin"}</h1>
                    </div>
                  </div>
                  <div className="right">
                    <p
                      onClick={() =>
                        dispatch(
                          _updateConversationUser({
                            makeAdmin: true,
                            user: user.user._id,
                            conversationId: selectedConversation._id,
                          })
                        )
                      }
                    >
                      <BsChevronRight />
                    </p>
                  </div>
                </div>
              );
            })}
            {/* {users.map((user) => {
               const matchAdmins = admins.find((admin) => admin._id == user._id);
              if(matchAdmins) return
              <div className="user" key={user._id}>
                <div className="left">
                  <div className="left-left">
                    <div className="pic-container">Pic</div>
                  </div>
                  <div className="left-right">
                    

                    <h1>{user.username}</h1>
                    Normal
                  </div>
                </div>
                <div className="right">
                  <p
                    onClick={() =>
                      dispatch(
                        _updateConversationUser({
                          makeAdmin: true,
                          user: user._id,
                          conversationId: selectedConversation._id,
                        })
                      )
                    }
                  >
                    <BsChevronRight />
                  </p>
                </div>
              </div>;
            })} */}
            {/* {users.map((user) => {
              const matchAdmins = admins.find((admin) => admin._id == user._id);
              if (matchAdmins) return;
              return (
               
              );
            })} */}
          </div>
          <br />
          <h3
            onClick={() =>
              dispatch(_deleteConversation(selectedConversation._id))
            }
          >
            Delete Group
          </h3>
        </div>
      </div>
      {/* <div className="leftTop-container right">
        <div
          className="icon-close"
          onClick={() => dispatch(_toggleRightSide())}
        >
          <GrClose />
        </div>
        <h1>Group info </h1>
      </div>
      <div className="info">
        <div className="top">
          <div className="info-pic">Info pic</div>
          <div>group info </div>
        </div>
       
      </div>
      <div className="bottom">
            Botom
        </div> */}
    </div>
  );
};

export default IsGroup;
