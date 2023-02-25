import React from "react";
import moment from "moment";
import Moment from "react-moment";
import { FaCheckDouble } from "react-icons/fa";
export const MessageTime = ({ date, right }) => {
  

  return (
    <div className="message-time">
      <div className="time">
        <Moment
          style={right ? { color: "white" } : { color: "#050505" }}
          format="ll"
        >
          {date}
        </Moment>
      </div>
      {right && <FaCheckDouble color="white" />}
    </div>
  );
};
