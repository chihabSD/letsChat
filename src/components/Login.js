import React from "react";

const Login = () => {
  return (
    <>
      <div>
        <h1>This is Login Page </h1>
      </div>
      <div className="register">
        <div className="card">
          <div className="card-header">
            <h3>Login</h3>
          </div>

          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  id="email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  id="password"
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
