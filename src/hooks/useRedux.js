import { useDispatch, useSelector } from "react-redux";
const useRedux = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    loadingReducer: { loading },
    registerReducer: { registered },
    profileReducer: { authenticated, account },
    errorReducer: { error },
  } = state;
  return {
    dispatch,
    authenticated, account, 
    loading,
    error,
    registered,
  };
};

export { useRedux };
