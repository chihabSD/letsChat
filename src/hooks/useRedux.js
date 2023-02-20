import { useDispatch, useSelector } from "react-redux";
const useRedux = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    loadingReducer: { loading },
    registerReducer: { registered },
    friendsReducer: { friends, messages },
    profileReducer: { authenticated, account },
    errorReducer: { error },
  } = state;
  return {
    dispatch,
    messages, 
    authenticated, account, friends, 
    loading,
    error,
    registered,
  };
};

export { useRedux };
