import React from "react";
import { AiOutlineStop } from "react-icons/ai";
import { FaTrash, FaTrashRestore } from "react-icons/fa";
const DeletedMessage = ({ message, _id, handleRestore, deleteForEver }) => {
  const findUser = message.deletedBy.find((user) => user.by === _id);
  return (
    <div className="message-container">
    <div className="deleted-message-container">
      {findUser ? (
        <div className="inner-container">
          <div className="top">
            <div className="top-top">
              <AiOutlineStop />
              <p>You deleted message temperorly,</p>
            </div>
            <p>receiver can still seet it</p>
          </div>
          <div className="bottom">
            <div className="restore" onClick={() => handleRestore(message)}>
              <FaTrashRestore className="icon" /> Restore
            </div>
            <div className="restore delete" onClick={() => deleteForEver(message)}>
              <FaTrash className="icon" /> Delete permanently
            </div>
          </div>
        </div>
      ) : (
        <div>He deleted this </div>
      )}
    </div>
    </div>
  );
};

export default DeletedMessage;
