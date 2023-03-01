import React from "react";
import MessageImagePreview from "../components/MessageImagePreview";
import MessageReactions from "../components/MessageReactions";
import { useRedux } from "../hooks/useRedux";

const MainLayOut = ({children }) => {
 const {rightSideToggled, messageMessagePreview, reactionListModal} = useRedux()
  return <div className={`${rightSideToggled ? "messenger-container toggleRight":'messenger-container'}`} >
    
    {messageMessagePreview &&
       
       <MessageImagePreview />
       }
         
         {reactionListModal &&
         
         <MessageReactions />
         }
    {children}
    
    </div>;
  
};

export default MainLayOut;
