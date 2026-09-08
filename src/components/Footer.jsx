import React from "react";
import logoImg from "../assets/bloodlogo.webp";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & Mission */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg border border-red-500 bg-gray-800">
                <img
                  className="h-8 w-8 rounded-full"
                  src={logoImg}
                  alt="BloodBond Logo"
                />
              </div>
              <span className="text-2xl font-black text-white tracking-tighter">
                Blood<span className="text-red-500">Bond</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Connecting heroes with those in need. Our platform simplifies the
              blood donation process, ensuring help reaches the right place at
              the right time.
            </p>
            <div className="flex gap-4">
              {/* Social Icons Placeholder */}
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">
                <i className="fab fa-facebook-f text-xs text-white"></i>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">
                <i className="fab fa-twitter text-xs text-white"></i>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">
                <i className="fab fa-instagram text-xs text-white"></i>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">
              Navigation
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <a href="/" className="hover:text-red-500 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/all-requests"
                  className="hover:text-red-500 transition-colors"
                >
                  Donation Requests
                </a>
              </li>
              <li>
                <a
                  href="/search-request"
                  className="hover:text-red-500 transition-colors"
                >
                  Search Donors
                </a>
              </li>
              <li>
                <a
                  href="/funding"
                  className="hover:text-red-500 transition-colors"
                >
                  Funding
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">
              Support
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <a
                  href="/privacy"
                  className="hover:text-red-500 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="hover:text-red-500 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-red-500 transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-red-500 transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">
              Join the Cause
            </h4>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to receive emergency blood requests in your area.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-gray-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-600 outline-none"
              />
              <button className="absolute right-2 top-2 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-lg transition-all">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 font-medium">
            © 2025 BloodBond. All rights reserved. Built with ❤️ for humanity.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-xs font-bold text-gray-400">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              System Status: Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
