import React, { useState, useEffect } from "react";
import Navbar from "../pages/Navbar";
import singupImage from "../assets/signup.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { signup } from "../redux/action/userAction";
import {
  isEmail,
  isEmpty,
  isLength,
  isMatch,
} from "../components/helper/validate";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = () => {
    if (isEmpty(name) || isEmpty(password)) {
      toast.error("Please fill in all fields");
    } else if (!isEmail(email)) {
      toast.error("Please enter a valid email address.");
    } else if (isLength(password)) {
      toast.error("Password must be at least 8 characters");
    } else if (!isMatch(password, confirmPassword)) {
      toast.error("Password did not match.");
    } else {
      const user = {
        name,
        email,
        password,
      };
      dispatch(signup(user));
      navigate("/signin");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container pt-[90px]">
        <div className="flex items-center flex-wrap">
          <div className="col-lg-6 md:hidden lg:hidden">
            <img
              src={singupImage}
              alt="anh dang ky"
              className="w-[400px] h-[400px] mx-auto rounded object-contain"
            />
          </div>
          <div className="col-lg-6 md:pt-[50px]">
            <div className="flex flex-col">
              <h1 className="mb-10 capitalize tracking-wide text-center text-2xl font-medium ml-[150px]">
                welcome back
                <p className="text-center text-base mt-4 text-gray-500">
                  Already an account ?{" "}
                  <a href="/signin" className="text-blue-500">
                    Sign in
                  </a>
                </p>
              </h1>
              <div className="flex items-center mb-4">
                <label className="w-[200px]">Username :</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded w-2/3"
                />
              </div>
              <div className="flex items-center mb-4">
                <label className="w-[200px]">Email :</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded w-2/3"
                />
              </div>
              <div className="flex items-center mb-4">
                <label className="w-[200px]">Password :</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded w-2/3"
                />
              </div>
              <div className="flex items-center mb-4">
                <label className="w-[200px]">Confirm Password :</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded w-2/3"
                />
              </div>
              <button
                className="w-2/3 md:w-2/4 rounded px-4 py-2 bg-blue-400 text-white mt-4 ml-auto mr-[10px] xl:mr-[0] lg:mr-[30px] md:mr-[0]"
                onClick={handleSignUp}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
