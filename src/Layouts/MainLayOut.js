import React from "react";
const MainLayOut = ({ children, rightSideToggled }) => {
  return (
    <div
      className={`${
        rightSideToggled
          ? "messenger-container toggleRight"
          : "messenger-container"
      }`}
    >
      {children}
    </div>
  );
};

export default MainLayOut;
