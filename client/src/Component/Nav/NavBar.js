import React from "react";

const NavBar = () => {
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
        <a className="navbar-brand pl-2" href="#">
          Market Data Bank
        </a>
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0"></ul>
        <form className="form-inline my-2 my-lg-0">
        </form>
      </div>
    </nav>
  );
};

export default NavBar;
