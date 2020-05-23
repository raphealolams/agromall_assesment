import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

const NavBar = ({ showLoginButton = true, onClick }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <a
          className="navbar-brand pl-2"
          href={!showLoginButton ? "/admin/home" : "/home"}
        >
          Market Data Bank
        </a>
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0"></ul>
        <div className="form-inline my-2 my-lg-0">
          {showLoginButton && (
            <Link to="/login">
              <Button
                buttonTitle="Admin Login"
                buttonClassName="btn btn-outline-primary m-2"
              />
            </Link>
          )}
          {!showLoginButton && (
            <Link to="/admin/add">
              <Button
                buttonTitle="Add Market"
                buttonClassName="btn btn-outline-success m-2"
              />
            </Link>
          )}
          {!showLoginButton && (
            <Button
              buttonTitle="Logout"
              buttonClassName="btn btn-outline-warning m-2"
              onClick={onClick}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
