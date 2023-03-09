import { useEffect, useRef, useState } from "react";
import { _deleteMessage } from "../redux/actions/message/deleteMessage";
import { insertImagePreview } from "../redux/reducers/friends";
import { _toggleMessageImagePrview } from "../redux/reducers/toggler";
import { useRedux } from "./useRedux";
// import { insertImagePreview } from "../../../redux/reducers/friends";
const useGroup = () => {
  const currentMessage = useRef(null);
  const { loadingConversation, dispatch, newMessageAdd } = useRedux();
  const [groupSettingsVisible, setGroupSettingsVisible] = useState(false);
  const [addUsersVisible, setAddUsersVisible] = useState(false);
  const [editGroupVisible, setEditGroupVisible] = useState(false);
  const toggleEditGroupAdmins = () => setEditGroupVisible((p) => !p);
  const toggleAddUsers = () => setAddUsersVisible((p) => !p);
  const toggleGroupSettings = () => setGroupSettingsVisible((p) => !p);

  return {
    groupSettingsVisible,
    editGroupVisible, 
    toggleAddUsers, addUsersVisible, 
    toggleEditGroupAdmins,
  };
};

export { useGroup };
