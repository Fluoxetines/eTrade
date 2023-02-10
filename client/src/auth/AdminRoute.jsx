import React from "react";
import { useSelector } from "react-redux";
import Protected from "./Protected";

const AdminRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.loginUserReducer);
  return currentUser && currentUser.role === "admin" ? children : <Protected />;
};

export default AdminRoute;
