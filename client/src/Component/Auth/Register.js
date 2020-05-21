import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, Redirect } from "react-router-dom";

import { store } from "../../store";

const Register = () => {
  const globalState = useContext(store);
  const { handleSignup, onChangeInput } = globalState;

  const styles = {
    container: {
      minHeight: "90vh",
    },
  };

  return (
    <div>
      {globalState.state.authError
        ? toast.error(globalState.state.authErrors.message, {
            position: toast.POSITION.TOP_RIGHT,
          })
        : toast.success("Sign up Ok", {
            position: toast.POSITION.TOP_RIGHT,
          })}

      {globalState.state.authSuccessful ? <Redirect exact to="/home" /> : null}

      <div
        className="d-flex pt-5 justify-content-center align-items-center"
        style={styles.container}
      >
        <div className="card p-4" style={{ width: "30%" }}>
          <div className="card-body">
            <h1>Signup</h1>
            <p className="text-muted">Register to your account</p>
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
              <label className="text-muted">First Name</label>
              <input
                className="form-control"
                type="text"
                placeholder="First Name"
                name="firstName"
                onChange={onChangeInput}
              />
            </div>
            <div className="pt-3">
              <label className="text-muted">Last Name</label>
              <input
                className="form-control"
                type="text"
                placeholder="Last Name"
                name="lastName"
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
            <div className="pt-3">
              <label className="text-muted">Enter Password Again</label>
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                name="confirmPassword"
                onChange={onChangeInput}
              />
            </div>
            <div className="row pt-3">
              <div className="col-6">
                <button
                  className="btn btn-primary px-4"
                  type="button"
                  onClick={handleSignup}
                >
                  Signup
                </button>
              </div>

              <div className="col-6 px-5">
                <Link to="/">
                  <button className="btn" type="button">
                    Login!
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

export default Register;
