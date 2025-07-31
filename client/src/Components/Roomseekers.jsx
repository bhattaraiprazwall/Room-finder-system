import { Link } from "react-router-dom";
import "../Css/UserDash.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../Pages/Footer";
import { useNavigate } from "react-router-dom";
import EnhancedQuoteSection from "../Pages/EnhancedQuoteSection";
import InfoBanner from "../Pages/InfoBanner";

const Roomseekers = () => {
  const [room, SetRoom] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchRooms = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/room/allRoom`);
      console.log(response);
        const  roomData = response.data;
      SetRoom(roomData);
      const randomRooms = [...roomData]
        .sort(() => 0.5 - Math.random())
        .slice(0, 9);
      setFilteredRooms(randomRooms);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleSearch = () => {
    if (location === "") {
         setFilteredRooms(room); 
       }
    else {
      const filtered = room.filter((room) =>
        room.location.toLowerCase().includes(location.toLowerCase())
      );
      setFilteredRooms(filtered);
       }
  }
   
  const handleViewDetails = (roomId) => {
    navigate(`/roominUserSide/${roomId}`); 
  };
   
  if (loading) {
    return <p>Loading...</p>;
  
}
  return (
    <>
        <div className="bg-gray-100 min-h-screen  flex flex-col">
        <nav className="bg-gray-800 p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-white text-lg font-semibold">
              <h1 className="font-bold text-2xl drop-shadow-2xl">Homefinder</h1>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/home"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/UserProfile" 
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Profile
              </Link>
              <Link
                to="/login"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </Link>
              <Link
                to="/help"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Help
              </Link>
            </div>
          </div>
        </nav>

        <div className="flex-grow">
          <div>
            <div className="flex justify- mt-5 ml-[30%]">
              <input
                className="px-44 py-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-italic placeholder-opacity-75"
                type="text"
                placeholder="Enter your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <button
                className="ml-4 px-8 py-3 rounded-2xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all duration-300"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 p-8">
            {filteredRooms.length > 0 ? (
              filteredRooms.map((room) => (
                <div
                  key={room._id}
                  className="bg-white p-4 rounded-lg shadow-lg"
                >
                  <img
                    src={room.frontimg} 
                    alt={room.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h2 className="text-xl font-bold">{room.title}</h2>
                  <p>{room.location}</p>
                  <p className="font-semibold text-lg text-blue-600">
                  ₹{room.price}
                  </p>
                  <button
                    className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300"
                    onClick={() => handleViewDetails(room._id)}
                  >  
                    View Details
                  </button>
                </div>
              ))
            ) : (
              <p className="text-white text-center w-full">
                No rooms found for the location.
              </p>
            )}
          </div>
        </div>
       
        <div className=" mt-20" >
             <EnhancedQuoteSection/>
        </div>
        <div className=" mt-20">
              <InfoBanner/>
          </div>
        <div>
                <Footer/>
              </div>
      </div>
    </>
  );
};

export default Roomseekers;
