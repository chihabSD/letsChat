import React from "react";
import { useNavigate } from "react-router-dom";
import { useRedux } from "../../hooks/useRedux";
import { _logout } from "../../redux/actions/auth/logout";
import { FaEllipsisH, FaEdit, FaSistrix } from "react-icons/fa";
import ActiveFriend from "../../components/ActiveFriend";
import Friends from "../../components/Friends";
import RightSide from "../../components/RightSide";
const Home = () => {
  const navigate = useNavigate();
  const {
    dispatch,
    account: { image, email, username },
  
  } = useRedux();
  const profilePic = `http://localhost:5000/images/${image}`;
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
                  <img src={profilePic} alt="" />
                </div>
                <div className="name">
                  <h3>Hi {username}</h3>
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
                  <FaSistrix />
                </button>
                <input
                  type="text"
                  placeholder="Search"
                  className="form-control"
                />
              </div>
            </div>

            {/* End friend search  */}
            <div className="active-friends">
              {<ActiveFriend image={`http://localhost:5000/images/${image}`} />}
            </div>
            <div className="friends">
              <div className="hover-friend">
                <Friends image={profilePic}/>
              </div>
              <div className="hover-friend">
                <Friends image={profilePic}/>
              </div>
              <div className="hover-friend">
                <Friends image={profilePic}/>
              </div>
              <div className="hover-friend">
                <Friends image={profilePic}/>
              </div>
              <div className="hover-friend">
                <Friends image={profilePic}/>
              </div>
              <div className="hover-friend">
                <Friends image={profilePic}/>
              </div>
              <div className="hover-friend">
                <Friends image={profilePic}/>
              </div>
              <div className="hover-friend">
                <Friends image={profilePic}/>
              </div>
              <div className="hover-friend">
                <Friends image={profilePic}/>
              </div>
              <div className="hover-friend">
                <Friends image={profilePic}/>
              </div>
            </div>
            {/* End of friend section */}
          </div>
        </div>
        {/* RIGHT SIDE  */}
      <RightSide image={profilePic}/>
      </div>
    </div>
  );
};

export default Home;
