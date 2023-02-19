import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRedux } from "../../hooks/useRedux";
import { _logout } from "../../redux/actions/auth/logout";
import { FaEllipsisH, FaEdit, FaSistrix } from "react-icons/fa";
import ActiveFriend from "../../components/ActiveFriend";
import Friends from "../../components/Friends";
import RightSide from "../../components/RightSide";
import { _getFriends } from "../../redux/actions/friends/getFriends";
import { Oval } from "react-loader-spinner";
const Home = () => {
  const navigate = useNavigate();
  const [currentFriend, setCurrentFriend] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const inputHandle = (e) => {
    setNewMessage(e.target.value);
  };
  const sendMessage = (e) => {
    e.preventDefault();
    console.log('message will be send', newMessage);
  }
  const {
    dispatch,
    friends,
    account: { image, email, username },
  } = useRedux();
  const profilePic = `http://localhost:5000/images/${image}`;
  const handleLogout = () => {
    dispatch(_logout());
    navigate("/login");
  };

  useEffect(() => {
    dispatch(_getFriends());
  }, []);


  useEffect(() => {
  if(friends && friends.length > 0){
    setCurrentFriend(friends[1])
  }
  }, [friends]);

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
                <div onClick={() => dispatch(_logout())} className="icon">
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
              {friends && friends.length > 0
                ? friends.map((fd) => (
                    <div
                      onClick={() => setCurrentFriend(fd)}
                      className="hover-friend"
                    >
                      <Friends
                        key={fd._id}
                        image={`http://localhost:5000/images/${fd.image}`}
                        username={fd.username}
                      />
                    </div>
                  ))
                : "No friends"}
            </div>
            {/* End of friend section */}
          </div>
        </div>
        {currentFriend ? (
          <RightSide
            image={profilePic}
            currentFriend={currentFriend}
            inputHandle={inputHandle}
            newMessage={newMessage}
            sendMessage ={sendMessage}
          />
        ) : (
          <div className="center-middle">

          <Oval
            height={20}
            width={80}
            color="#fff"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
        )}
        {/* RIGHT SIDE  */}
      </div>
    </div>
  );
};

export default Home;
