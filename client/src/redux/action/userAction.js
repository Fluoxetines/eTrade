import axios from "axios";
import { toast } from "react-hot-toast";
import { baseUrl } from "../../apis/baseUrl";

export const signup = (user) => async (dispatch) => {
  dispatch({ type: "REGISTER_USER_REQUEST" });
  try {
    const res = await axios.post(`${baseUrl}/users/signup`, user);
    console.log(res);
    dispatch({ type: "REGISTER_USER_SUCCESS" });
    toast.success("Register successfully !");
  } catch (err) {
    dispatch({ type: "REGISTER_USER_FAIL", payload: err });
  }
};

export const signin = (user) => async (dispatch) => {
  dispatch({ type: "LOGIN_USER_REQUEST" });
  try {
    const res = await axios.post(`${baseUrl}/users/signin`, user);
    console.log(res);
    dispatch({ type: "LOGIN_USER_SUCCESS", payload: res.data });
    localStorage.setItem("currentUser", JSON.stringify(res.data));
    toast.success("Login successfully !");
    window.location.href = "/";
  } catch (err) {
    dispatch({ type: "LOGIN_USER_FAIL", payload: err });
  }
};

export const forgotPassword = (user) => async () => {
  try {
    const res = await axios.post(`${baseUrl}/users/forgot`, user);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

export const resetPassword = (user) => async () => {
  try {
    const res = await axios.post(`${baseUrl}/users/reset-password`, user);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("cartItems");
  window.location.href = "/signin";
};
