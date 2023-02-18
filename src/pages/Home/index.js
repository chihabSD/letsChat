import React from "react";
import { useNavigate } from "react-router-dom";
import { useRedux } from "../../hooks/useRedux";
import { _logout } from "../../redux/actions/auth/logout";

const Home = () => {
  const navigate = useNavigate();
  const { dispatch } = useRedux();
  const handleLogout = () => {
    dispatch(_logout());
    navigate("/login");
  };
  return (
    <div>
      index
      <button onClick={handleLogout}> Logout </button>
    </div>
  );
};

export default Home;
