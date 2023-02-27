import React from "react";
import MessageImagePreview from "../components/MessageImagePreview";
import { useRedux } from "../hooks/useRedux";

const MainLayOut = ({children }) => {
 const {rightSideToggled, messageMessagePreview} = useRedux()
  return <div className={`${rightSideToggled ? "messenger-container toggleRight":'messenger-container'}`} >
    
    {messageMessagePreview &&
       
       <MessageImagePreview />
       }
    {children}</div>;
  
};

export default MainLayOut;
