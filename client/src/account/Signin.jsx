import React, { useState, useEffect } from "react";
import Navbar from "../pages/Navbar";
import signinImage from "../assets/signin.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../redux/action/userAction";
import { isEmail, isEmpty, isLength } from "../components/helper/validate";
import { toast } from "react-hot-toast";
const Signin = () => {
  const { currentUser } = useSelector((state) => state.loginUserReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = () => {
    if (isEmpty(email) || isEmpty(password)) {
      toast.error("Please fill in all fileds");
    } else if (!isEmail(email)) {
      toast.error("Please enter a valid email address.");
    } else if (isLength(password)) {
      toast.error("Password must be at least 8 characters");
    } else {
      const user = { email, password };
      dispatch(signin(user));
    }
  };
  if (currentUser) {
    navigate("/");
  }

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      navigate("/");
    }
  }, [navigate]);

  console.log(password);

  return (
    <>
      <Navbar />
      <div className="container pt-[90px]">
        <div className="flex items-center flex-wrap">
          <div className="col-lg-6 md:hidden lg:hidden">
            <img
              src={signinImage}
              alt="anh dang nhap"
              className="w-[400px] h-[400px] mx-auto rounded object-contain"
            />
          </div>
          <div className="col-lg-6 md:pt-[50px]">
            <div className="flex flex-col">
              <h1 className="mb-10 capitalize tracking-wide text-center text-2xl font-medium ml-[50px]">
                welcome back
                <p className="text-center text-base mt-4 text-gray-500">
                  Don't have an account ?{" "}
                  <a href="/signup" className="text-blue-500">
                    Sign up
                  </a>
                </p>
              </h1>
              <div className="flex items-center mb-4">
                <label className="w-[120px]">Email :</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded w-2/3"
                />
              </div>
              <div className="flex items-center mb-4">
                <label className="w-[120px]">Password :</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded w-2/3"
                />
              </div>
              <button
                className="w-2/3 rounded px-4 py-2 bg-blue-400 text-white mt-4 ml-[120px]"
                onClick={handleSignin}
              >
                Submit
              </button>
            </div>
            <p className="text-end text-base mr-[90px] mt-4 text-gray-500 md:text-end">
              <a href="/forgot-password" className="text-blue-500">
                Forgot Password ?
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
