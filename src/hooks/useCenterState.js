import { useEffect, useRef, useState } from "react";
import { _deleteMessage } from "../redux/actions/message/deleteMessage";
import { _toggleMessageImagePrview } from "../redux/reducers/toggler";
import { useRedux } from "./useRedux";
// import { insertImagePreview } from "../../../redux/reducers/friends";
const useCenter = () => {
  const currentMessage = useRef(null);
  const { loadingConversation, dispatch, newMessageAdd } = useRedux();
  const [reactionVisible, setReactionVisible] = useState(false);
  const [settingsModalVisbile, setSettingsModalVisible] = useState(false);
  const [selectedMessage, setSeelectedMessage] = useState(null);

  const toggleSettingModal = () => {
    setSettingsModalVisible((prev) => !prev);
  };

  const toggleReactionModal = () => {
    setReactionVisible((prev) => !prev);
  };

  // const handleImagePreview = (msg) => {
  //   const { imageUrl } = msg;
  //   // dispatch(insertImagePreview({ imageUrl }));
  //   dispatch(_toggleMessageImagePrview());
  // };

  // RESTORE
  const handleRestore = (msg) => {
    dispatch(_deleteMessage({ messageId: msg._id, restore: true }));
  };

  const handleMessageAction = (message) => {
    setSeelectedMessage(message._id);

    toggleSettingModal();
  };

  useEffect(() => {
    if (selectedMessage === null) {
      return;
    }
    // console.log(selectedMessage, reactionVisible);
  }, [selectedMessage]);

  const handleSelectedMessage = (message) => {
    setSeelectedMessage(message._id);
    toggleReactionModal();
  };

  const handleSettings = (message) => {
    // if (setting === "Remove") {
    dispatch(_deleteMessage({ messageId: message._id }));
    // }
  };

  return {
    currentMessage,
    toggleReactionModal,
    handleMessageAction,
    reactionVisible,
    handleSettings,
    toggleSettingModal,
    setReactionVisible,
    settingsModalVisbile,
    selectedMessage,
    handleSelectedMessage,
    handleRestore,
  };
};

export { useCenter };
