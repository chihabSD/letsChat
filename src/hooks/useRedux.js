import { useDispatch, useSelector } from "react-redux";
const useRedux = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    loadingReducer: { loading },
    registerReducer: { registered },
    friendsReducer: {
      friends,
      latestReaction,
      newMessageAdd , 
      timeLines, 
      currentMessage,
      messages,
      conversations,
      currentMessageReactions,  
      imagePreview,
      selectedConversation,
      updatingMessage
    },
    profileReducer: { authenticated, account },
    toggleReducer: {
      rightSideToggled,
      emojiBoxyToggled,
      messageMessagePreview,
      reactionListModal,
    },
    errorReducer: { error },
  } = state;
  return {
    dispatch,
    rightSideToggled,
    emojiBoxyToggled,
    currentMessage,
    currentMessageReactions, 
    reactionListModal,
    messages,
    conversations,
    authenticated,
    account,
    friends,
    loading,
    latestReaction,
    error,
    selectedConversation,
    registered,
    messageMessagePreview,
    imagePreview,
    timeLines,  newMessageAdd, updatingMessage
  };
};

export { useRedux };
