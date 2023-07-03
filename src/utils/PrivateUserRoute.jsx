import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateUserRoute = ({ children }) => {
  let { user } = useContext(AuthContext);
  return <>{user ? children : <Navigate to="/login" />}</>;
};

export default PrivateUserRoute;
