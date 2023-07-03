import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateAdminRoute = ({ children }) => {
  let { user, role } = useContext(AuthContext);
  return <>{user && role === 'Admin' ? children : <Navigate to="/login" />}</>;
};

export default PrivateAdminRoute;


