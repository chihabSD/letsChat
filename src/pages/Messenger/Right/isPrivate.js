import React from "react";
import { BsChevronRight } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { useRedux } from "../../../hooks/useRedux";
import { _toggleRightSide } from "../../../redux/reducers/toggler";

const IsPrivate = ({ selectedConversation }) => {
  const { groupName, users } = selectedConversation;
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
        <h1>Contact info </h1>
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
              return (
                <div className="user" key={user._id}>
                  <div className="left">
                    <div className="left-left">
                      <div className="pic-container">Pic</div>
                    </div>
                    <div className="left-right">
                      <h1>user</h1>
                      <h1>Group admin</h1>
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

export default IsPrivate;
