import React, { useContext } from "react";
import { toast } from "react-toastify";
import { Link, Redirect } from "react-router-dom";

import { store } from "../../store";

const Login = () => {
  const globalState = useContext(store);
  const { handleLogin, onChangeInput } = globalState;

  const styles = {
    container: {
      minHeight: "90vh",
    },
    width: { width: "30%" },
  };

  return (
    <div>
      {globalState.state.authError &&
        toast.error(globalState.state.authErrors.message, {
          position: toast.POSITION.TOP_RIGHT,
        })}

      {globalState.state.authSuccessful &&
        toast.success("Login Successful", {
          position: toast.POSITION.TOP_RIGHT,
        })}
      {globalState.state.authSuccessful && <Redirect exact to="/home" />}
      <div
        className="d-flex pt-5 justify-content-center align-items-center"
        style={styles.container}
      >
        <div className="card p-4" style={styles.width}>
          <div className="card-body">
            <h1>Login</h1>
            <p className="text-muted">Sign In to your account</p>
            <div className="pt-3">
              <label className="text-muted">Email</label>
              <input
                className="form-control"
                type="email"
                placeholder="email"
                name="email"
                onChange={onChangeInput}
              />
            </div>
            <div className="pt-3">
              <label className="text-muted">Password</label>
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                name="password"
                onChange={onChangeInput}
              />
            </div>
            <div className="row pt-3">
              <div className="col-6">
                <button
                  className="btn btn-primary px-4"
                  type="button"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>

              <div className="col-6 px-5">
                <Link to="/register">
                  <button className="btn" type="button">
                    Signup!
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
