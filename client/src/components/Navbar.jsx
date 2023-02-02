import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { BsCart2 } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/action/userAction";
const Navbar = () => {
  const [navState, setNavState] = useState(false);
  const { currentUser } = useSelector((state) => state.loginUserReducer);
  const [dropdown, setDropdown] = useState(false);
  const ref = useRef();
  const dispatch = useDispatch();

  // detected click outside
  useOnClickOutside(ref, () => setDropdown(false));
  function useOnClickOutside(ref, handler) {
    useEffect(() => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("click", listener);
      return () => {
        document.removeEventListener("click", listener);
      };
    }, [ref, handler]);
  }

  // toggle dropdown
  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  // logout user
  const handleLogout = () => {
    dispatch(logout());
  };

  // fixed scroll navbar
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
    <div className={!navState ? "bg-transparent" : "fixed left-0 right-0 z-20"}>
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
            <div className="flex items-center relative">
              <CiSearch className="w-6 h-6 cursor-pointer mx-3" />
              <div className="relative">
                <BsCart2 className="w-6 h-6 cursor-pointer mx-3" />
              </div>
              {!currentUser && (
                <Link to="/signin">
                  <BiUser className="w-6 h-6 cursor-pointer mx-3" />
                </Link>
              )}
              {currentUser && currentUser.role === "admin" ? (
                <>
                  <Link to="#!" ref={ref} onClick={handleDropdown}>
                    <img
                      src={currentUser.image}
                      alt="avatar"
                      className="w-[30px] h-[30px] rounded-full"
                    />
                  </Link>
                  {dropdown ? (
                    <ul className="absolute right-0 top-full min-w-[150px] rounded-md bg-[#4f57d8] mt-3 text-white py-5 z-[9999999]">
                      <li className="px-4 py-3">
                        <Link className="inline-block w-full">Dashboard</Link>
                      </li>
                      <li className="px-4 py-3">
                        <Link className="inline-block w-full">
                          Account Details
                        </Link>
                      </li>
                      <li className="px-4 py-3">
                        <Link className="inline-block w-full">Orders</Link>
                      </li>
                      <li className="px-4 py-3">
                        <Link
                          className="inline-block w-full"
                          onClick={handleLogout}
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  ) : null}
                </>
              ) : (
                <>
                  <Link to="#!" ref={ref} onClick={handleDropdown}>
                    <img
                      src={currentUser.image}
                      alt="avatar"
                      className="w-[30px] h-[30px] rounded-full"
                    />
                  </Link>
                  {dropdown ? (
                    <ul>
                      <li>
                        <Link className="inline-block w-full">
                          Account Details
                        </Link>
                      </li>
                      <li>
                        <Link className="inline-block w-full">My Order</Link>
                      </li>
                      <li>
                        <Link
                          className="inline-block w-full"
                          onClick={handleLogout}
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  ) : null}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
