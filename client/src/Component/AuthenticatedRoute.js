import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
      exact
    />
  );
};

export default AuthenticatedRoute;
