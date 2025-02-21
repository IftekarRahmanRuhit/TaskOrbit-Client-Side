import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import Swal from "sweetalert2";

import { AuthContext } from "../../Provider/AuthProvider";

const Navbar = () => {
  const { user, signOutUser, loading } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              ? "text-[#38A1DB] font-medium relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-[#38A1DB] after:to-[#1E90FF]"
              : "text-gray-300 hover:text-[#38A1DB] font-medium transition-colors duration-300"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/addTask"
          className={({ isActive }) =>
            isActive
              ? "text-[#38A1DB] font-medium relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-[#38A1DB] after:to-[#1E90FF]"
              : "text-gray-300 hover:text-[#38A1DB] font-medium transition-colors duration-300"
          }
        >
          Add Task
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allTask"
          className={({ isActive }) =>
            isActive
              ? "text-[#38A1DB] font-medium relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-[#38A1DB] after:to-[#1E90FF]"
              : "text-gray-300 hover:text-[#38A1DB] font-medium transition-colors duration-300"
          }
        >
          Manage Tasks
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
        className={`w-full mx-auto  bg-gradient-to-r from-[#1a1e21] via-[#212428] to-[#1a1e21] 
          md:p-1 max-w-screen-2xl mx-auto fixed top-0 z-50 `}
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
                  className="h-5 w-5 text-white"
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
                <ul className="menu menu-sm dropdown-content bg-gradient-to-b from-[#1a1e21] to-[#212428]  rounded-box z-[1] mt-3 w-52 p-2 shadow">
                  {links}
                </ul>
              )}
            </div>
            <Link
              to="/"
              className="btn btn-ghost text-2xl text-[#38A1DB] font-bold flex justify-center items-center"
            >
              <p className="text-lg md:text-2xl">TaskOrbit</p>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu-horizontal space-x-8">{links}</ul>
          </div>
          <div className="navbar-end">
            {user && (
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
                    className="menu menu-sm dropdown-content bg-gradient-to-b from-[#1a1e21] to-[#212428] rounded-box z-[1] mt-3 w-52 p-2 shadow"
                  >
                    <div className="card-body p-2 w-full">
                      <span className="text-gray-400 font-bold text-xl text-center block">
                        {user?.displayName}
                      </span>
                      <span className="text-gray-400 font-bold block overflow-hidden text-ellipsis whitespace-nowrap max-w-full text-center">
                        {user?.email}
                      </span>
                      <div className="card-actions">
                        <button
                          onClick={handleSignOut}
                          className="btn bg-gradient-to-r from-[#294C5F] to-[#212428] text-white hover:from-[#212428] hover:to-[#294C5F]  transition-all duration-300  btn-block w-full mt-3 border border-[#38A1DB]"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            ) }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar; 






// import { useContext, useState } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { FaUserCircle, FaUser } from "react-icons/fa";
// import { LuLogIn } from "react-icons/lu";
// import { AuthContext } from "../../Provider/AuthProvider";

// const Navbar = () => {
//   const { user, signOutUser, loading } = useContext(AuthContext);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleSignOut = () => {
//     signOutUser()
//       .then(() => {
//         navigate("/login");
//         toast.success("Sign out successful");
//       })
//       .catch((error) => {
//         toast.error(error.message);
//       });
//   };

//   const links = (
//     <>
//       <li>
//         <NavLink
//           to="/"
//           className={({ isActive }) =>
//             isActive
//               ? "text-[#38A1DB] font-medium relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-[#38A1DB] after:to-[#1E90FF]"
//               : "text-gray-300 hover:text-[#38A1DB] font-medium transition-colors duration-300"
//           }
//         >
//           Home
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to="/addTask"
//           className={({ isActive }) =>
//             isActive
//               ? "text-[#38A1DB] font-medium relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-[#38A1DB] after:to-[#1E90FF]"
//               : "text-gray-300 hover:text-[#38A1DB] font-medium transition-colors duration-300"
//           }
//         >
//           Add Task
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to="/allTask"
//           className={({ isActive }) =>
//             isActive
//               ? "text-[#38A1DB] font-medium relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-[#38A1DB] after:to-[#1E90FF]"
//               : "text-gray-300 hover:text-[#38A1DB] font-medium transition-colors duration-300"
//           }
//         >
//           Manage Tasks
//         </NavLink>
//       </li>
//     </>
//   );

//   if (loading) {
//     return (
//       <div className="w-full h-16 flex items-center justify-center bg-gradient-to-r from-[#1a1e21] via-[#212428] to-[#1a1e21]">
//         <div className="text-[#38A1DB]">
//           <span className="loading loading-bars loading-md"></span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-11/12 mx-auto">

//     <div className="w-full fixed top-0 z-50">
//       <div className="absolute inset-0 bg-gradient-to-r from-[#1a1e21] via-[#212428] to-[#1a1e21] opacity-95"></div>
//       <nav className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-20">
//           {/* Logo Section */}
//           <div className="flex items-center">
//             <div className="lg:hidden">
//               <button
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 className="p-2 rounded-md text-gray-300 hover:text-[#38A1DB] transition-colors"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M4 6h16M4 12h8m-8 6h16"
//                   />
//                 </svg>
//               </button>
//             </div>
//             <Link
//               to="/"
//               className="flex items-center space-x-2"
//             >
//               <span className="text-2xl font-bold bg-gradient-to-r from-[#38A1DB] via-[#1E90FF] to-[#38A1DB] bg-clip-text text-transparent">
//                 TaskOrbit
//               </span>
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex lg:items-center">
//             <ul className="flex space-x-8">{links}</ul>
//           </div>

//           {/* User Section */}
//           <div className="flex items-center space-x-4">
//             {user && (
//               <div className="relative">
//                 <button
//                   onClick={() => setIsMenuOpen(!isMenuOpen)}
//                   className="flex items-center space-x-2 p-2 rounded-full bg-gradient-to-r from-gray-800/50 to-gray-700/50 hover:from-gray-700/50 hover:to-gray-600/50 transition-all duration-300"
//                 >
//                   <div className="h-8 w-8 rounded-full overflow-hidden bg-gradient-to-r from-[#38A1DB]/20 to-[#1E90FF]/20 flex items-center justify-center">
//                     {user?.photoURL ? (
//                       <img
//                         src={user.photoURL}
//                         alt={user.displayName}
//                         className="h-full w-full object-cover"
//                       />
//                     ) : (
//                       <FaUserCircle className="h-6 w-6 text-[#38A1DB]" />
//                     )}
//                   </div>
//                 </button>

//                 {isMenuOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-gradient-to-b from-[#1a1e21] to-[#212428] rounded-lg shadow-xl py-2 border border-gray-700">
//                     <div className="px-4 py-2">
//                       <p className="text-sm font-medium text-[#38A1DB]">{user.displayName}</p>
//                       <p className="text-xs text-gray-400 truncate">{user.email}</p>
//                     </div>
//                     <div className="border-t border-gray-700/50">
//                       <button
//                         onClick={handleSignOut}
//                         className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gradient-to-r hover:from-[#38A1DB]/10 hover:to-transparent transition-all duration-300"
//                       >
//                         Sign out
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )  
              
//             }
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <div className="lg:hidden absolute w-full left-0 top-full bg-gradient-to-b from-[#1a1e21] to-[#212428] border-t border-gray-800">
//             <div className="px-4 py-3">
//               <ul className="flex flex-col space-y-2">
//                 {links}
//               </ul>
//             </div>
//           </div>
//         )}
//       </nav>
//     </div>
//     </div>
//   );
// };

// export default Navbar;
