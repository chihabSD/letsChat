import React from "react";
import { BsChevronRight } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { useRedux } from "../../../hooks/useRedux";
import { _deleteConversation } from "../../../redux/actions/friends/deleteConversation";
import { _toggleRightSide } from "../../../redux/reducers/toggler";

const IsGroup = ({ selectedConversation }) => {
  const { groupName, users, admins } = selectedConversation;

 

  const { rightSideToggled, dispatch } = useRedux();
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
            <h1> Group : {users.length} </h1>
          </div>
        </div>

        <div className="info-bottom">
          <div className="users">
            <p>{users.length} participants</p>

     

            {users.map((user) => {
              const matchAdmins = admins.find(admin => admin._id == user._id )
              return (
                <div className="user" key={user._id} >
                  <div className="left">
                    <div className="left-left">
                      <div className="pic-container">Pic</div>
                    </div>
                    <div className="left-right">
                      <h1>user</h1>
                      <h1>{matchAdmins ? "Current admin":null}</h1>
                    </div>
                  </div>
                  <div className="right">
                    <p>

                  <BsChevronRight />
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <br />
          <h3 onClick={() => dispatch(_deleteConversation(selectedConversation._id))}>Delete Group</h3>
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
