import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import Swal from "sweetalert2";
import { MdDarkMode } from "react-icons/md";
import { IoMdSunny } from "react-icons/io";
import { AuthContext } from "../../Provider/AuthProvider";
import { ThemeContext } from "../../ThemeContext/ThemeContext";


const Navbar = () => {
  const { user, signOutUser, loading } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        navigate("/login");
        toast.success("Sign out successful");
      })
      .catch((error) => {
        toast.error(error.message);
        
      });
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-[#00ADB5] font-semibold underline"
              : "text-gray-700 dark:text-blue-50 dark:hover:text-[#00ADB5] hover:text-[#00ADB5] font-semibold transition-all duration-200"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/taskBoard"
          className={({ isActive }) =>
            isActive
              ? "text-[#00ADB5] font-semibold underline"
              : "text-gray-700 dark:text-blue-50 dark:hover:text-[#00ADB5] hover:text-[#00ADB5] font-semibold transition-all duration-200"
          }
        >
          All Task
        </NavLink>
      </li>
    
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
              ? "text-[#00ADB5] font-semibold underline"
              : "text-gray-700 dark:text-blue-50 dark:hover:text-[#00ADB5] hover:text-[#00ADB5] font-semibold transition-all duration-200"
          }
            >
              Add Task
            </NavLink>
          </li>

      
    
    </>
  );

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="bg-base-100 dark:bg-gray-900 w-full">
          <div className="text-center dark:text-[cyan] dark:bg-gray-900">
            <span className="loading loading-bars loading-md"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
<div className="max-w-screen-2xl mx-auto">
<div
      className={`w-full mx-auto  ${
        theme === "light"
          ? "bg-gradient-to-r from-white via-[#E0F7F9] to-[#F0FCFC]"
          : "bg-gradient-to-r from-gray-900 via-gray-800 to-black"
      } md:p-2 max-w-screen-2xl mx-auto fixed top-0 z-50 `}
    >
      <div className="navbar w-full md:w-11/12 mx-auto pt-4 pb-4 ">
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <button
              className="btn btn-ghost lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 dark:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <ul className="menu menu-sm dropdown-content bg-base-100 dark:bg-slate-800 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                {links}
              </ul>
            )}
          </div>
          <Link
            to="/"
            className="btn btn-ghost text-2xl text-[#00ADB5] font-bold flex justify-center items-center"
          >
            
            <p className="text-lg md:text-2xl">TaskOrbit</p>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu-horizontal space-x-8">{links}</ul>
        </div>
        <div className="navbar-end">
          <div className="mr-5">
            {theme === "light" ? (
              <MdDarkMode
                onClick={() => {
                  setTheme("dark");
                  localStorage.setItem("theme", "dark");
                }}
                className="text-[30px] bg-slate-300 text-black p-1 rounded-full cursor-pointer"
              />
            ) : (
              <IoMdSunny
                onClick={() => {
                  setTheme("light");
                  localStorage.setItem("theme", "light");
                }}
                className="text-[30px] bg-slate-300 text-yellow-600 p-1 rounded-full cursor-pointer"
              />
            )}
          </div>

          {user ? (
            <div className="flex-none">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex="0"
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div
                    className="w-10 rounded-full"
                    title={user?.displayName || "User"}
                  >
                    {user?.photoURL ? (
                      <img src={user.photoURL} alt="" />
                    ) : (
                      <p className="text-2xl">
                        <FaUserCircle />
                      </p>
                    )}
                  </div>
                </div>
                <ul
                  tabIndex="0"
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <div className="card-body p-2 w-full">
                    <span className="text-gray-800 font-bold text-xl text-center block">
                      {user?.displayName}
                    </span>
                    <span className="text-gray-800 font-bold block overflow-hidden text-ellipsis whitespace-nowrap max-w-full text-center">
                      {user?.email}
                    </span>
                    <div className="card-actions">
                      <button
                        onClick={handleSignOut}
                        className="btn bg-gradient-to-r from-[#00ADB5] to-[#008C8C] text-white hover:bg-gradient-to-l hover:bg-[#008C8C] transition-all duration-300 border-none btn-block w-full mt-3"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </ul>
              </div>
            </div>
          ) : (
            <>
              <Link
                className="btn btn-sm md:btn-md mr-2 bg-gradient-to-r from-[#00ADB5] to-[#008C8C] text-white hover:bg-gradient-to-l hover:bg-[#008C8C] transition-all duration-300 hidden md:flex border-none"
                to="/Register"
              >
                <FaUser className="mr-1" /> Sign up
              </Link>
              <Link
                className="btn btn-sm md:btn-md font-bold bg-gradient-to-r from-[#00ADB5] to-[#008C8C] text-white hover:bg-gradient-to-l hover:bg-[#008C8C] transition-all duration-300 border-none"
                to="/login"
              >
                <LuLogIn className="mr-1" /> Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
</div>
  );
};

export default Navbar;