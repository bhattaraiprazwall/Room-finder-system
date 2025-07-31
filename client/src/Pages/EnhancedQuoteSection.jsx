import React from "react";

const EnhancedQuoteSection = () => {
  return (
    <div className="relative bg-gray-900 text-white py-20">
      
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70"></div>
      <div className="relative z-10 container mx-auto text-center px-4">
        <h2 className="text-5xl font-extrabold mb-6 tracking-wide drop-shadow-lg">
          Discover Your Dream Home
        </h2>
        <p className="text-2xl italic font-light mb-8">
          "A house is made of walls and beams; a home is built with love and
          dreams."
        </p>
        <button className="px-8 py-4 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-lg">
          Start Your Search
        </button>
      </div>
    </div>
  );
};

export default EnhancedQuoteSection;
