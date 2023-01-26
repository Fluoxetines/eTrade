import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { BsCart2 } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
const Navbar = () => {
  const [navState, setNavState] = useState(false);
  const onNavScroll = () => {
    if (window.scrollY > 30) {
      setNavState(true);
    } else {
      setNavState(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", onNavScroll);
    return () => {
      window.removeEventListener("scroll", onNavScroll);
    };
  }, []);
  return (
    <div className={!navState ? "bg-white" : "fixed left-0 right-0 z-20"}>
      <div className="container">
        <div className="bg-white px-[40px] rounded-[10px] shadow-xl flex items-center">
          <div className="flex justify-between items-center w-full">
            <Link to="/" className="font-medium text-base">
              Ecommerce
            </Link>
            <nav className="flex items-center justify-center">
              <Link
                to="/"
                className="font-medium text-base h-[80px] leading-[80px] mx-4"
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="font-medium text-base h-[80px] leading-[80px] mx-4"
              >
                Shop
              </Link>
            </nav>
            <div className="flex items-center">
              <CiSearch className="w-6 h-6 cursor-pointer mx-3" />
              <div className="relative">
                <BsCart2 className="w-6 h-6 cursor-pointer mx-3" />
              </div>
              <Link to="/signin">
                <BiUser className="w-6 h-6 cursor-pointer mx-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
