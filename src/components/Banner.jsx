import React from "react";
import bdPoster from "../assets/bdposter.webp";
import { Link } from "react-router";

const Banner = () => {
  return (
    <section className="relative bg-gray-50 overflow-hidden">
      {/* Decorative Background Shape */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 hidden lg:block">
        <svg width="400" height="400" fill="none" viewBox="0 0 400 400">
          <circle cx="200" cy="200" r="190" stroke="#fee2e2" strokeWidth="20" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-left">
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-red-600 uppercase bg-red-100 rounded-full">
              Save a Life Today
            </span>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
              Connecting Hearts Through{" "}
              <span className="text-red-600">BloodBond</span>
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed">
              Your small act of kindness can give someone a second chance at
              life. Join our community of heroes or find a donor in your time of
              need.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-red-600 rounded-xl shadow-lg hover:bg-red-700 hover:shadow-red-200 transition-all duration-300 transform hover:-translate-y-1"
              >
                Join as a Donor
                <svg
                  className="w-5 h-5 ml-2"
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
              </Link>

              <Link
                to="/search-request"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-red-600 bg-white border-2 border-red-600 rounded-xl hover:bg-red-50 transition-all duration-300 transform hover:-translate-y-1"
              >
                Search Donors
              </Link>
            </div>

            {/* Trust Indicator */}
            <div className="mt-10 flex items-center gap-4 text-sm text-gray-500">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-red-400 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-red-300 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-red-500 border-2 border-white"></div>
              </div>
              <p>
                Joined by{" "}
                <span className="font-bold text-gray-900">2,000+</span> active
                donors
              </p>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src={bdPoster}
                alt="Blood Donation"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent flex items-start p-8">
                <p className="text-black italic font-medium text-lg">
                  "Be the reason for someone's heartbeat."
                </p>
              </div>
            </div>

            {/* Floating Stat Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl hidden md:block">
              <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">
                Live Updates
              </p>
              <p className="text-3xl font-black text-red-600">24/7</p>
              <p className="text-sm text-gray-600">Emergency Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
