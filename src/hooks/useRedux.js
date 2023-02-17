import { useDispatch, useSelector } from "react-redux";
const useRedux = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    loadingReducer: { loading },
    registerReducer: { registered },
    errorReducer: { error },
  } = state;
  return {
    dispatch,
    loading,
    error,
    registered,
  };
};

export { useRedux };
