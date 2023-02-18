import React from "react";
import { useNavigate } from "react-router-dom";
import { useRedux } from "../../hooks/useRedux";
import { _logout } from "../../redux/actions/auth/logout";
import { FaEllipsisH,FaEdit,FaSistrix } from "react-icons/fa";
const Home = () => {
  const navigate = useNavigate();
  const {
    dispatch,
    account: { image, email, username },
  } = useRedux();
  const handleLogout = () => {
    dispatch(_logout());
    navigate("/login");
  };
  return (
    <div className="messenger">
      <div className="row">
        <div className="col-3">
          <div className="left-side">
            <div className="top">
              <div className="image-name">
                <div className="image">
                  <img src={`http://localhost:5000/images/${image}`} alt="" />
                </div>
                <div className="name">
                  <h1>Hi {username}</h1>
                </div>
              </div>

              <div className="icons">
                <div className="icon">
                  <FaEllipsisH />
                </div>
                <div className="icon">
                  <FaEdit />
                </div>
              </div>
            </div>

            <div className="friend-search">
              <div className="search">
                <button>
                  
                  <FaSistrix />{" "}
                </button>
                <input
                  type="text"
                  placeholder="Search"
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
