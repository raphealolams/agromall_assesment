import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import { store } from "./store";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Login from "./Component/Auth/Login";
import Register from "./Component/Auth/Register";
import DashBoard from "./Component/Dashboard";

import AuthenticatedRoute from "./Component/AuthenticatedRoute";

function App() {
  return (
    <Fragment>
      <Router>
        <ToastContainer autoClose={4000} />
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />

        <Switch>
          <AuthenticatedRoute component={DashBoard} exact path="/home" />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
