import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useRedux } from "../hooks/useRedux";
import Login from "../pages/auth/Login";

export default function LoggedInRoutes({children}) {

  const {  authenticated} =   useRedux()
//   const { user } = useSelector((state) => ({ ...state }));
//   return authenticated  ? children : <Navigate to="/login"/>;
  return authenticated  ? <Outlet /> : <Login />;
}