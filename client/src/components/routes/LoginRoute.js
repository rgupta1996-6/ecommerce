import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const LoginRoute = ({ children,history, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? (
   <Redirect to="/user/history" />
  ) : (
    <Route {...rest} render={() => children} />
  );
};

export default LoginRoute;
