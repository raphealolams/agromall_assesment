import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import { store } from "./store";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
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
import ViewMarket from "./Component/Market/ViewMarket";
import EditMarket from "./Component/Market/EditMarket";

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
          <AuthenticatedRoute component={ViewMarket} exact path="/view/:id" />
          <AuthenticatedRoute component={EditMarket} exact path="/edit/:id" />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
