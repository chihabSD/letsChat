import { useDispatch, useSelector } from "react-redux";
const useRedux = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    loadingReducer: { loading },
    registerReducer: { registered },
    friendsReducer: { friends,messageReactions,latestReaction , currentMessage,   messages, conversations,imagePreview,  selectedConversation },
    profileReducer: { authenticated, account },
    toggleReducer:{rightSideToggled, emojiBoxyToggled, messageMessagePreview}, 
    errorReducer: { error },
  } = state;
  return {
    dispatch,
    rightSideToggled, 
    messageReactions, 
    emojiBoxyToggled,currentMessage,  
    
    messages,conversations,  
    authenticated, account, friends, 
    loading,
    latestReaction , 
    error,
    selectedConversation,
    registered,
    messageMessagePreview, imagePreview
  };
};

export { useRedux };
