import React from "react";
import { AiOutlineStop } from "react-icons/ai";
import { BsLockFill, BsStop } from "react-icons/bs";
import { TbMessageCircleOff } from "react-icons/tb";
import { useRedux } from "../../../hooks/useRedux";
import EmptyLayout from "../../../Layouts/EmptyLayout";
import { _updateConversationUser } from "../../../redux/actions/friends/updateConversationUser";

const ContentsHidden = () => {
  const { dispatch, account, selectedConversation } = useRedux();
  return (
    <div className="center empty">
      <AiOutlineStop size={100} />
      <h1>Sorry, you left this group 😢 </h1>
      <p>You will be able to receive and send messages when you go back</p>
      <div className="plus-container">
        {/* <FaPlus  /> */}
        <h1
          onClick={() =>
            dispatch(
              _updateConversationUser({
                updateType: "addBack",
                conversationType: selectedConversation.type, 
                conversationId: selectedConversation._id,
              })
            )
          }
        >
          Add me back in
        </h1>
      </div>
    </div>
    // <EmptyLayout>
    //   <AiOutlineStop size={100} />
    //   <h1> Sorry, you left this group   </h1>
    //   <p>You will be able to receive and send  messages when you go back</p>

    // </EmptyLayout>
  );
};

export default ContentsHidden;
