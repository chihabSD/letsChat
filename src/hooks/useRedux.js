import { useDispatch, useSelector } from "react-redux";
export const useRedux = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    loadingReducer: { loading },
    registerReducer: { registered },
    friendsReducer: {
      friends,
      latestReaction,
      newMessageAdd , 
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
      emojiBoxyToggled,
      messageMessagePreview,
      reactionListModal,
      newGroup, newConversation
    },
    errorReducer: { error },
  } = state;
  return {
    dispatch,
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
      newMessageAdd, updatingMessage, newConversation
  };
};

// export { useRedux };
