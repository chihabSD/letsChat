import React, {  useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useRedux } from "../hooks/useRedux";
import { _register } from "../redux/actions/auth/register";

const Register = () => {
  const { loading, dispatch } = useRedux();
  const fileInput = useRef(null)

  const [loadImage, setLoadImage] = useState("");
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  const [file, setFile] = useState(null);
  const { username, password, email, confirmPassword,image } = state;

  // handle inputs
  const inputHandle = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // handle image input
  const handleImage = (e) => {
    // console.log('target file', e.target.name, e.target.files[0]);
    if (e.target.files.length !== 0) {
      // setFile(e.target.files[0])
      setState({ ...state, image: e.target.files[0] });
      // setFile(e.target.files[0])
    //   setFile(s
    //     URL.createObjectURL(e.target.files[0])
    // );
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
    console.log('updated state after image', state.image);
    const data = new FormData();

    data.append("username", username);
    data.append("email", email);
    data.append("password", password);
    data.append("confirmPassword", confirmPassword);
    data.append("image",  image);


    // console.log(data);
    dispatch(_register(data));
  };
  if (loading) {
    return <h1>Loading </h1>;
  }
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
