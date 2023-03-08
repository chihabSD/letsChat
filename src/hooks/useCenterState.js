import { useEffect, useRef, useState } from "react";
import { useRedux } from "./useRedux";

const useCenter = () => {
  const currentMessage = useRef(null);
  const { loadingConversation, dispatch, newMessageAdd } = useRedux();
  const [reactionVisible, setReactionVisible] = useState(false);
  const [settingsModalVisbile, setSettingsModalVisible] = useState(false);

  const toggleSettingModal = () => {
    setSettingsModalVisible((prev) => !prev);
  };

  const toggleReactionModal = () => {
    setReactionVisible((prev) => !prev);
  };

//   const handleImagePreview = (msg) => {
//     const { imageUrl } = msg;
//     dispatch(insertImagePreview({ imageUrl }));
//     dispatch(_toggleMessageImagePrview());
//   };

  return {
    currentMessage,
    toggleReactionModal,
    reactionVisible,
    toggleSettingModal,
    setReactionVisible,
    settingsModalVisbile,
    //  handleImagePreview
  };
};

export { useCenter };
