import React from "react";
import MainLayOut from "../../Layouts/MainLayOut";
import CenterNoCoversation from "./Center/CenterNoCoversation";
import LeftNoConversation from "./Left/LeftNoConversation";

const NoConversation = () => {
  return (
    <MainLayOut>
      <LeftNoConversation />
      <CenterNoCoversation />
    </MainLayOut>
  );
};

export default NoConversation;
