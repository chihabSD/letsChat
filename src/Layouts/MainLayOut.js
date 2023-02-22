import React from "react";

const MainLayOut = ({children, toggleRight}) => {
  return <div className={`${toggleRight ? "messenger-container-toggleRight":'messenger-container'}`} >{children}</div>;
};

export default MainLayOut;
