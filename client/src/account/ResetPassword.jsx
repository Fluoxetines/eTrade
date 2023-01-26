import React, { useState } from "react";
import Navbar from "../pages/Navbar";
import resetImage from "../assets/reset-password.png";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <>
      <Navbar />
      <div className="container pt-[90px]">
        <div className="flex items-center flex-wrap">
          <div className="col-lg-6 md:hidden lg:hidden">
            <img
              src={resetImage}
              alt="anh dang nhap"
              className="w-[400px] h-[400px] mx-auto rounded object-contain"
            />
          </div>
          <div className="col-lg-6 md:pt-[50px]">
            <div className="flex flex-col max-w-[500px]">
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
              <button className="w-2/3 rounded px-4 py-2 bg-blue-400 text-white mt-4 ml-[120px]">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
