import React from "react";

const FeaturedSection = () => {
  const steps = [
    {
      title: "Register",
      desc: "Join our community by providing your blood group and location.",
      icon: (
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
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      title: "Find Donors",
      desc: "Search for donors near you based on blood group and urgency.",
      icon: (
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
    },
    {
      title: "Save Lives",
      desc: "Connect instantly and help someone in an emergency situation.",
      icon: (
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
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Content */}
        <div className="text-center mb-16">
          <h2 className="text-red-600 font-bold tracking-widest uppercase text-sm mb-3">
            Why BloodBond?
          </h2>
          <p className="text-3xl md:text-4xl font-black text-gray-900">
            Making Blood Donation Simple
          </p>
          <div className="w-24 h-1.5 bg-red-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            { label: "Active Donors", value: "1,200+" },
            { label: "Lives Saved", value: "3,500+" },
            { label: "Cities Covered", value: "45+" },
            { label: "Blood Banks", value: "120+" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="p-6 bg-gray-50 rounded-2xl text-center border border-gray-100 hover:border-red-200 transition-colors"
            >
              <p className="text-3xl font-black text-gray-900">{stat.value}</p>
              <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shadow-sm">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              {/* Connector line for desktop */}
              {index < 2 && (
                <div className="hidden lg:block absolute top-8 left-24 w-full h-0.5 border-t-2 border-dashed border-gray-200 -z-10"></div>
              )}
            </div>
          ))}
        </div>

        {/* High Demand Notice */}
        <div className="mt-20 bg-red-600 rounded-3xl p-8 md:p-12 overflow-hidden relative shadow-2xl shadow-red-200">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Urgent Need for O- Negative
              </h3>
              <p className="text-red-100 opacity-90">
                We are currently facing a shortage of O- donors in your region.
              </p>
            </div>
            <button
              onClick={() => (window.location.href = "/search")}
              className="bg-white text-red-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              Check Requests
            </button>
          </div>
          {/* Abstract background circles */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-red-500 rounded-full opacity-50"></div>
          <div className="absolute -left-10 -top-10 w-32 h-32 bg-red-700 rounded-full opacity-30"></div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
