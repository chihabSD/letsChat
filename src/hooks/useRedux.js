import { useDispatch, useSelector } from "react-redux";
const useRedux = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    loadingReducer: { loading },
    registerReducer: { registered },
    friendsReducer: { friends, messages, conversations,imagePreview,  selectedConversation },
    profileReducer: { authenticated, account },
    toggleReducer:{rightSideToggled, emojiBoxyToggled, messageMessagePreview}, 
    errorReducer: { error },
  } = state;
  return {
    dispatch,
    rightSideToggled, 
    emojiBoxyToggled, 
    messages,conversations,  
    authenticated, account, friends, 
    loading,
    error,
    selectedConversation,
    registered,
    messageMessagePreview, imagePreview
  };
};

export { useRedux };
