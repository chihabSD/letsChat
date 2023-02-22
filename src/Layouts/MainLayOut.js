import React from "react";
import { useRedux } from "../hooks/useRedux";

const MainLayOut = ({children }) => {
 const {rightSideToggled} = useRedux()
  return <div className={`${rightSideToggled ? "messenger-container-toggleRight":'messenger-container'}`} >{children}</div>;
  
};

export default MainLayOut;
