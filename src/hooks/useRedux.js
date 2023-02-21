import { useDispatch, useSelector } from "react-redux";
const useRedux = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    loadingReducer: { loading },
    registerReducer: { registered },
    friendsReducer: { friends, messages, conversations, selectedConversation },
    profileReducer: { authenticated, account },
    errorReducer: { error },
  } = state;
  return {
    dispatch,
    messages,conversations,  
    authenticated, account, friends, 
    loading,
    error,
    selectedConversation,
    registered,
  };
};

export { useRedux };
