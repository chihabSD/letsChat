import React from "react";
import { FaPlus } from "react-icons/fa";
import { useRedux } from "../../../hooks/useRedux";
import { _toggleNewConversation, _toggleNewGroup } from "../../../redux/reducers/toggler";

const CenterNoCoversation = () => {
  const { dispatch } = useRedux();
  
  return (
    <div className="center empty">
      <h1>Let's Get Started 😄</h1>

      <div className="plus-container" onClick={()=>dispatch((_toggleNewConversation()))}>
        {/* <FaPlus  /> */}
        <h1>Create Conversation</h1>
      </div>
    </div>
  );
};

export default CenterNoCoversation;
