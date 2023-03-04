import React from "react";

import Moment from "react-moment";
import { FaCheckDouble } from "react-icons/fa";
export const MessageTime = ({ date, right, reply }) => {
  

  return (
    <div className="message-time">
      <div className="time">
        <Moment
  
          className="timedate"
          // style={ {fontSize:'0.9rem', color:right && reply ? 'grey': right ? 'white':"grey"  }}
          format="ll"
        >
          {date}
        </Moment>
      </div>
      {right && <FaCheckDouble color="white" />}
    </div>
  );
};
