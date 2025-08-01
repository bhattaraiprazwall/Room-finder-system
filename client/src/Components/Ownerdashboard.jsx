import React, { useContext} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { configContext } from "../Context/ConfigContext";
import "../Css/OwnerDash.css";
import Footer from "../Pages/Footer";

const OwnerDashboard = () => {
  const { details } = useContext(configContext);

  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.clear();
    navigate("/login");
  }

  return (
    <div className="bg-blue-50 h-screen w-full">
      {/* <nav className="bg-gray-800 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg font-semibold">
              
              <h1 className="font-bold text-2xl drop-shadow-2xl"  >Homefinder</h1>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/RoomCreate"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Create Room
            </Link>
            <Link
              to="/Profile"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Profile
            </Link>
            <Link
              to="/renter"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
                Your Renter
            </Link>
            <Link  
               onClick={logout}
              to="/login"  
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </Link>
          </div>
        </div>
      </nav> */}
      <div className="Home h-[90%] w-[100%] relative">
        <div className="h-[15%] w-[100%] flex items-center justify-center">
          <h1 className="font-bold text-gray-900 text-4xl">
            Hii, Welcome {details.name}
          </h1>
        </div>
        <div className="bg-transparent py-5 px-6 text-center">
          <p className="Font text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-900 via-pink-500 to-red-500 opacity- hover:text-purple-500 mt-48 drop-shadow-5xl">
            Have a room to rent? List it on MyRoomFinder and connect with room
            seekers today!
          </p>
        </div>
      </div>
      {/* <div className="h-screen w-full bg-slate-400"></div> */}
      <div>
            <Footer/>
          </div>
    </div>
  );
};

export default OwnerDashboard;
