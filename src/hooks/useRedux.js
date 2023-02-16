import { useDispatch, useSelector } from "react-redux";
const useRedux = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    loadingReducer: { loading },
  } = state;
  return {
    dispatch,
    loading,
  };
};

export { useRedux };
