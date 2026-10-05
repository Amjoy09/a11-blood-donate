import React, { use, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";

import logoImg from "../assets/bloodlogo.webp";
import { AuthContext } from "../provider/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = use(AuthContext);

  const navigate = useNavigate();

  // Avatar dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Reference for avatar + dropdown area
  const avatarRef = useRef(null);

  // Logout
  const logout = () => {
    logoutUser();

    navigate("/login");

    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  // Close avatar dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu after clicking a navigation link
  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================
            MAIN NAVBAR
        ========================== */}

        <div className="flex justify-between items-center h-20">
          {/* =========================
              LOGO
          ========================== */}

          <div className="flex items-center">
            <NavLink
              to="/"
              className="flex items-center gap-2 group"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsDropdownOpen(false);
              }}
            >
              <div className="p-1.5 rounded-xl border-2 border-red-500 bg-red-50 group-hover:bg-red-500 transition-colors duration-300">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={logoImg}
                  alt="BloodBond Logo"
                />
              </div>

              <span className="text-2xl font-black text-gray-900 tracking-tighter">
                Blood<span className="text-red-600">Bond</span>
              </span>
            </NavLink>
          </div>

          {/* =========================
              DESKTOP NAVIGATION
          ========================== */}

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

          {/* =========================
              RIGHT SIDE
          ========================== */}

          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Button */}

            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                setIsDropdownOpen(false);
              }}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                // X icon
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger icon
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>

            {/* =========================
                USER / LOGIN
            ========================== */}

            {user ? (
              <div ref={avatarRef} className="relative">
                {/* Avatar Button */}

                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(!isDropdownOpen);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center focus:outline-none transition-transform active:scale-95"
                >
                  <div className="relative">
                    {user?.photoURL ? (
                      <img
                        className="h-11 w-11 rounded-full border-2 border-red-500 p-0.5 object-cover"
                        src={user.photoURL}
                        alt={user?.displayName || "User"}
                      />
                    ) : (
                      <div className="h-11 w-11 rounded-full border-2 border-red-500 bg-red-50 flex items-center justify-center text-red-600 font-bold">
                        {user?.displayName?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                    )}

                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                </button>

                {/* =========================
                    AVATAR DROPDOWN
                ========================== */}

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in duration-200">
                    {/* Account information */}

                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Account
                      </p>

                      <p className="text-sm font-bold text-gray-800 truncate">
                        {user?.displayName || "User"}
                      </p>
                    </div>

                    {/* Dashboard */}

                    <Link
                      to="/dashboard"
                      onClick={() => {
                        setIsDropdownOpen(false);
                      }}
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

                    {/* Logout */}

                    <button
                      type="button"
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

        {/* =====================================
            MOBILE NAVIGATION MENU
        ====================================== */}

        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col gap-1">
              <NavLink
                to="/donation-requests"
                onClick={handleMobileLinkClick}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                    isActive
                      ? "bg-red-50 text-red-600"
                      : "text-gray-700 hover:bg-red-50 hover:text-red-600"
                  }`
                }
              >
                Donation Requests
              </NavLink>

              <NavLink
                to="/search-request"
                onClick={handleMobileLinkClick}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                    isActive
                      ? "bg-red-50 text-red-600"
                      : "text-gray-700 hover:bg-red-50 hover:text-red-600"
                  }`
                }
              >
                Search Donors
              </NavLink>

              <NavLink
                to="/donate"
                onClick={handleMobileLinkClick}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                    isActive
                      ? "bg-red-50 text-red-600"
                      : "text-gray-700 hover:bg-red-50 hover:text-red-600"
                  }`
                }
              >
                Donate
              </NavLink>

              {user && (
                <NavLink
                  to="/payment-success"
                  onClick={handleMobileLinkClick}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                      isActive
                        ? "bg-red-50 text-red-600"
                        : "text-gray-700 hover:bg-red-50 hover:text-red-600"
                    }`
                  }
                >
                  Funding
                </NavLink>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
