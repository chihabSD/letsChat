import React from "react";

const NoSelectedChat = () => {
  return (
    <div className="center empty">
      <h1>You don't have active conversation yet 😄</h1>
      {/* <div className="plus-container"> */}
        <p style={{marginTop:'10px', color:'grey'}}>Please select conversation from the left </p>
      {/* </div> */}
    </div>
  );
};

export default NoSelectedChat;
