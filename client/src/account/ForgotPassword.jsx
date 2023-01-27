import React, { useState, useEffect } from "react";
import Navbar from "../pages/Navbar";
import emailImage from "../assets/send-mail.png";
import { baseUrl } from "../helpers/baseUrl";
import axios from "axios";
import { toast } from "react-hot-toast";
import { isEmail, isEmpty } from "../components/helper/validate";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../redux/action/userAction";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/users`);
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleForgotPassword = async () => {
    if (!users.find((user) => user.email === email)) {
      toast.error("This email address is not register in our system");
    } else if (isEmpty(email)) {
      toast.error("Please fill in all fileds");
    } else if (!isEmail(email)) {
      toast.error("Please enter a valid email address.");
    } else {
      const user = { email };
      dispatch(forgotPassword(user));
      toast.success("Email send successfully, please check your email.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container pt-[90px]">
        <div className="flex items-center flex-wrap">
          <div className="col-lg-6 md:hidden lg:hidden">
            <img
              src={emailImage}
              alt="anh dang nhap"
              className="w-[400px] h-[400px] mx-auto rounded object-contain"
            />
          </div>
          <div className="col-lg-6 md:pt-[50px]">
            <div className="flex flex-col max-w-[500px]">
              <h1 className="mb-10 capitalize tracking-wide text-center text-2xl font-medium ml-[50px]">
                forgot password
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
              <button
                className="w-2/3 rounded px-4 py-2 bg-blue-400 text-white mt-4 ml-[120px]"
                onClick={handleForgotPassword}
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

export default ForgotPassword;
