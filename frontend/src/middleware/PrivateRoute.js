import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = true;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />

    // <Route
    //   {...rest}
    //   render={({ location }) =>
    //     isAuthenticated ? (
    //       children
    //     ) : (
    //       <Redirect
    //         to={{
    //           pathname: "/login",
    //           state: { from: location },
    //         }}
    //       />
    //     )
    //   }
    // />
  );
};

export { PrivateRoute };
