import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.loginUserReducer);
  return currentUser ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
