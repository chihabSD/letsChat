import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRedux } from "../../hooks/useRedux";
import { ToastContainer, toast } from "react-toastify";
import { _login } from "../../redux/actions/auth/login";
import { clearError } from "../../redux/reducers/error";
const Login = () => {
const { loading, dispatch, error, registered } = useRedux();
const notify = () => toast.success("Registeration completed successfully");
const toastId = React.useRef(null);
const navigate = useNavigate();
const errorNotify = () =>toastId.current = toast.error(error, {closeOnClick:dispatch(clearError())});
const dismiss = () =>  toast.dismiss(toastId.current);
const [state, setState] = useState({
  email: "",
  password: "",
  
});
const {  password, email} = state;

 const inputHandle = (e) => {
  setState({ ...state, [e.target.name]: e.target.value });
};

 // handle submit
 const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(_login({email, password}))
 }
 useEffect(() => {
  if(error){
    errorNotify()
    
    
  }
}, [error])

  return (
    <>
     
      <div className="register">
        <div className="card">
          <div className="card-header">
            <h3>Login</h3>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>
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
                <input type="submit" value="login" className="btn" />
              </div>

              <div className="form-group">
                <span>
                  <Link to="/register"> Don't have any Account </Link>
                </span>
              </div>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
