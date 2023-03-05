import React from "react";
import MessageImagePreview from "../components/MessageImagePreview";
import MessageReactions from "../components/MessageReactions";
import NewGroupModal from "../components/newGroupModal";
import { useRedux } from "../hooks/useRedux";

const MainLayOut = ({children }) => {
 const {rightSideToggled,newGroup,  messageMessagePreview, reactionListModal} = useRedux()
  return <div className={`${rightSideToggled ? "messenger-container toggleRight":'messenger-container'}`} >
    
    {messageMessagePreview &&
       
       <MessageImagePreview />
       }
         
         {reactionListModal &&
         
         <MessageReactions />
         }
         {newGroup &&
         
         <NewGroupModal />
         }
    {children}
    
    </div>;
  
};

export default MainLayOut;
