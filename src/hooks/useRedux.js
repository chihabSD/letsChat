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
      searchUsers, 
      conversations,
      currentMessageReactions,  
      imagePreview,
      selectedConversation,
      updatingMessage, loadingConversation
    },
    profileReducer: { authenticated, account },
    toggleReducer: {
      rightSideToggled,
      emojiBoxyToggled,
      messageMessagePreview,
      reactionListModal,
      newGroup, newConversation
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
    newGroup, 
    latestReaction,
    error,
    searchUsers, 
    selectedConversation,
    registered,
    messageMessagePreview,
    imagePreview,
    loadingConversation, 
    timeLines,  newMessageAdd, updatingMessage, newConversation
  };
};

export { useRedux };
