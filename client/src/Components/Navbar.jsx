import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";


const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Local state just to trigger re-render on location change
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    // Update state on location change to force re-render
    setCurrentPath(location.pathname);
  }, [location]);

  // This will force Navbar to re-render when user changes too
  useEffect(() => {
    // No code needed here, just re-render on user change
  }, [user]);

  const handleLogout = () => {
    logout(); // make sure your logout clears user state in context!
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-700">
        RoomFinder
      </Link>

      <div className="space-x-4 hidden md:block">


        {!user ? (
          <>
            <Link to="/" className="hover:text-blue-600 transition">
              Home
            </Link>

            <Link
              to="/register"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Signup
            </Link>
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Login
            </Link>
          </>
        ) : (
          <>
            {/* <Link
              to="/RoomCreate"
              className="hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Create Room
            </Link> */}
            <Link to="/Roomseekers" className="hover:text-blue-600 transition">
              Home
            </Link>
            <Link
              to="/Profile"
              className="hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Profile
            </Link>
            <Link
              to="/bookings"
              className="hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              My Bookings
            </Link>
            <button
              onClick={handleLogout}
              className="hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
