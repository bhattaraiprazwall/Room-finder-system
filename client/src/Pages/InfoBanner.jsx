import React from "react";
import { FaHome, FaMapMarkerAlt, FaDollarSign } from "react-icons/fa"; 

const InfoBanner = () => {
  return (
    <div className="relative bg-blue-100 text-gray-900 py-16">
      

      {/* Content */}
      <div className="relative z-10 container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <FaHome className="text-6xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
            <p className="text-gray-600">
              Choose from a variety of rooms in the best locations, with all the
              amenities you need.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <FaMapMarkerAlt className="text-6xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Prime Locations</h3>
            <p className="text-gray-600">
              We help you find homes in the most sought-after areas, ensuring a
              great neighborhood experience.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <FaDollarSign className="text-6xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Affordable Prices</h3>
            <p className="text-gray-600">
              Get the best deals and flexible payment options to fit your
              budget, without compromising quality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBanner;
