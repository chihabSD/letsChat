import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRedux } from "../../hooks/useRedux";
import { _register } from "../../redux/actions/auth/register";
import { clearRegistered } from "../../redux/reducers/register";
import { ToastContainer, toast } from "react-toastify";
import { Circles, Oval } from "react-loader-spinner";

import "react-toastify/dist/ReactToastify.css";
import { clearError } from "../../redux/reducers/error";
const Register = () => {
  const { loading, dispatch, error, registered } = useRedux();
  const notify = () => toast.success("Registeration completed successfully");
  const toastId = React.useRef(null);
  const navigate = useNavigate();


  const errorNotify = () =>toastId.current = toast.error(error, {closeOnClick:dispatch(clearError())});
  const dismiss = () =>  toast.dismiss(toastId.current);



  const [loadImage, setLoadImage] = useState("");
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  const [file, setFile] = useState(null);
  const { username, password, email, confirmPassword, image } = state;

  // handle inputs
  const inputHandle = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // handle image input
  const handleImage = (e) => {
    if (e.target.files.length !== 0) {
      setState({ ...state, image: e.target.files[0] });
    }
    const reader = new FileReader();
    reader.onload = () => {
      setLoadImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("updated state after image", state.image);
    const data = new FormData();

    data.append("username", username);
    data.append("email", email);
    data.append("password", password);
    data.append("confirmPassword", confirmPassword);
    data.append("image", image);
    dispatch(_register(data));
  };

  useEffect(() => {
    if (registered) {
      notify();
      setTimeout(() => {
        navigate("/login");
        dispatch(clearRegistered());
      }, 1000);
    }
  }, [registered]);
  useEffect(() => {
    if(error){
      errorNotify()
      // setTimeout(() => {

      //   dismiss()
      // }, 3000)
      
    }
  }, [error])
  return (
    <div className="register">
      <div className="card">
        <div className="card-header">
          <h3>Register</h3>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit} id="form">
            <div className="form-group">
              <label htmlFor="username">User Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="User Name"
                id="username"
                onChange={inputHandle}
                name="username"
                value={username}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                id="email"
                onChange={inputHandle}
                name="email"
                value={email}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                id="password"
                onChange={inputHandle}
                name="password"
                value={password}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                id="confirmPassword"
                onChange={inputHandle}
                name="confirmPassword"
                value={confirmPassword}
              />
            </div>

            <div className="form-group">
              <div className="file-image">
                <div className="image">
                  {loadImage ? <img src={loadImage} /> : ""}
                </div>
                <div className="file">
                  <label htmlFor="image">Select Image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    onChange={handleImage}
                    name="image"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <input type="submit" value="register" className="btn" />
            </div>

            <div className="form-group">
              <span>
                <Link to="/login"> Login Your Account </Link>
              </span>
            </div>
            <div className="form-group">
              <div className="loading">
                {loading && (
                  <>
                    <div className="circle">
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
                    <span>One sec....</span>
                  </>
                )}
              </div>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Register;
