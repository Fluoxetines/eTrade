import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./account/Signin";
import Signup from "./account/Signup";
import ForgotPassword from "./account/ForgotPassword";
import ResetPassword from "./account/ResetPassword";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/auth/reset-password/:token"
            element={<ResetPassword />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
