import React from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({
  passIf,
  children,
}: {
  passIf: "loggedIn" | "loggedOut";
  children: any;
}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["auth-token"]);

  const isValid = cookies["auth-token"] ?? false;

  if (passIf == "loggedIn" && isValid) {
    return children;
  } else if (passIf == "loggedOut") {
    if (!isValid) {
      return children;
    } else {
      return <Navigate to="/dashboard" />;
    }
  } else {
    return <Navigate to="/auth/login" />;
  }
};

export default PrivateRoute;
