import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./Component/Auth/Login";
import Register from "./Component/Auth/Register";
import DashBoard from "./Component/Dashboard";

import AuthenticatedRoute from "./Component/AuthenticatedRoute";
import ViewMarket from "./Component/Market/ViewMarket";
import EditMarket from "./Component/Market/EditMarket";
import AddMarket from "./Component/Market/AddMarket";
import Search from "./Component/Search/Search";

function App() {
  return (
    <Fragment>
      <Router>
        <ToastContainer autoClose={4000} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Search} />
        <Route exact path="/home" component={Search} />
        <Route exact path="/view/:id" component={ViewMarket} />;
        <Switch>
          <AuthenticatedRoute component={DashBoard} exact path="/admin/home" />
          <AuthenticatedRoute component={AddMarket} exact path="/admin/add" />

          <AuthenticatedRoute
            component={ViewMarket}
            exact
            path="/admin/view/:id"
          />
          <AuthenticatedRoute
            component={EditMarket}
            exact
            path="/admin/edit/:id"
          />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
