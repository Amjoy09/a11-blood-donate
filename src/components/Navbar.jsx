import React, { use, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";

import logoImg from "../assets/bloodlogo.webp";
import { AuthContext } from "../provider/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = use(AuthContext);
  const navigate = useNavigate();
  // State for the avatar dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const logout = () => {
    logoutUser();
    navigate("/login");
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Navbar Start: Logo */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center gap-2 group">
              <div className="p-1.5 rounded-xl border-2 border-red-500 bg-red-50 group-hover:bg-red-500 transition-colors duration-300">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={logoImg}
                  alt="Logo"
                />
              </div>
              <span className="text-2xl font-black text-gray-900 tracking-tighter">
                Blood<span className="text-red-600">Bond</span>
              </span>
            </NavLink>
          </div>

          {/* Navbar Center: Links */}
          <div className="hidden lg:flex items-center gap-6">
            <NavLink
              to="/donation-requests"
              className={({ isActive }) =>
                `text-sm font-bold transition-colors ${
                  isActive ? "text-red-600" : "text-gray-600 hover:text-red-600"
                }`
              }
            >
              Donation Requests
            </NavLink>
            <NavLink
              to="/search-request"
              className={({ isActive }) =>
                `text-sm font-bold transition-colors ${
                  isActive ? "text-red-600" : "text-gray-600 hover:text-red-600"
                }`
              }
            >
              Search Donors
            </NavLink>

            <NavLink
              to="/donate"
              className={({ isActive }) =>
                `text-sm font-bold transition-colors ${
                  isActive ? "text-red-600" : "text-gray-600 hover:text-red-600"
                }`
              }
            >
              Donate
            </NavLink>
            {user && (
              <NavLink
                to="/payment-success"
                className={({ isActive }) =>
                  `text-sm font-bold transition-colors ${
                    isActive
                      ? "text-red-600"
                      : "text-gray-600 hover:text-red-600"
                  }`
                }
              >
                Funding
              </NavLink>
            )}
          </div>

          {/* Navbar End: User Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative">
                {/* Clickable Avatar */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center focus:outline-none transition-transform active:scale-95"
                >
                  <div className="relative">
                    <img
                      className="h-11 w-11 rounded-full border-2 border-red-500 p-0.5 object-cover"
                      src={user?.photoURL || "via.placeholder.com"}
                      alt="User"
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in duration-200">
                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Account
                      </p>
                      <p className="text-sm font-bold text-gray-800 truncate">
                        {user?.displayName || "User"}
                      </p>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Dashboard
                    </Link>

                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-red-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-red-100 hover:bg-red-700 transition-all transform hover:-translate-y-0.5"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
