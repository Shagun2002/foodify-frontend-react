import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../components/context/AuthContext";

const PrivateUserRoute = ({ children }) => {
  let { user } = useContext(AuthContext);
  return <>{user ? children : <Navigate to="/login" />}</>;
};

export default PrivateUserRoute;
