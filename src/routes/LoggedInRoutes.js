// import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useRedux } from "../hooks/useRedux";

export default function NotLoggedInRoutes() {
  const {  authenticated} =   useRedux()
//   const { user } = useSelector((state) => ({ ...state }));

  return authenticated ? <Navigate to="/"/> : <Outlet />;
}