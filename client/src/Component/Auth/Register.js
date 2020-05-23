import React, { useContext } from "react";
import { toast } from "react-toastify";
import { Link, Redirect } from "react-router-dom";

import { store } from "../../store";

import Button from "../Button/Button";
import Spinner from "../Spinner/Spinner";

const Register = () => {
  const globalState = useContext(store);
  const {
    handleSignup,
    onChangeInput,
    state: { email, firstName, lastName, password, confirmPassword, showSpinner, authError, authErrors, authSuccessful },
  } = globalState;

  const styles = {
    container: {
      minHeight: "90vh",
    },
  };

  console.log(globalState.state);
  const disabled =
    (email.length > 0 && firstName.length > 0 && password.length > 0 &&
      confirmPassword.length > 0 && (password === confirmPassword));
  return (
    <div>
      {authError &&
        toast.error(authErrors.message, {
          position: toast.POSITION.TOP_RIGHT,
        })}

      {authSuccessful &&
        toast.success("Sign up Ok", {
          position: toast.POSITION.TOP_RIGHT,
        })}
      {authSuccessful && (
        <Redirect exact to="/admin/home" />
      )}

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
                value={email}
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
                value={firstName}
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
                value={lastName}
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
                value={password}
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
                value={confirmPassword}
                onChange={onChangeInput}
              />
            </div>
            <div className="row pt-3">
              <div className="col-6">
                <Button
                  buttonClassName="btn btn-primary px-4"
                  buttonTitle="Signup"
                  onClick={handleSignup}
                  disabled={!disabled}
                />
                {showSpinner && <Spinner />}
              </div>

              <div className="col-6 px-5">
                <Link to="/login">
                  <Button buttonClassName="btn" buttonTitle="Login!" />
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
