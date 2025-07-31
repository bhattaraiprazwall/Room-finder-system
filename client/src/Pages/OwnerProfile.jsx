import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { configContext } from "../Context/ConfigContext";
import Home from "../assets/Home.jpg";
import { useNavigate } from "react-router-dom";

const OwnerProfile = () => {
  const { details } = useContext(configContext);
     console.log(details);
     console.log("Details ID:", details._id);

  const [room, setRoom] = useState([]);
  console.log(room);
  
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Token is missing");

      const res = await axios.get(
         `http://localhost:5000/room/getRoomByOwner/${details._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 20000,
        }
      );
      
           console.log(res);
           
      setRoom(res.data);
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response);
        toast.error(`Error: ${error.response.status} - ${error.response.data.msg || "Failed to fetch rooms"}`);
      } else {
        console.error("Request failed:", error);
        toast.error("Error fetching rooms: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (details && details.role === "admin") {
      fetchRooms();
    } else {
      setLoading(false);
    }
  }, [details]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!details) {
    return <p>Please log in to view your rooms.</p>;
  }

  if (details.role !== "admin") {
    return <p>You are not an owner, so you have no rooms.</p>;
  }

  const handleCardClick = (roomId) => {
    navigate(`/room/${roomId}`);
  };
    
  return (
    <>
      <div className="h-[100%]  w-[100%]">  
        <div className="h-[55%] w-[100%]">
          <div className="h-[100%] w-[100%] flex items-center justify-center flex-col bg-blue-50">
            <div className="h-[50%] w-[10%] bg-black rounded-[50%] ">
              <img
                className="h-[100%] w-[100%] rounded-[50%]"
                src={details.img || Home}
                alt="Owner" 
              />
            </div>
            <h1 className="font-semibold mt-6">
              <span className="font-bold text-xl">Name: </span>
              {details.name}
            </h1>
            <h1 className="font-semibold">
              <span className="font-bold text-xl">Role: </span>
              {details.role}
            </h1>
            <h1 className="font-semibold">
              <span className="font-bold text-xl">Email: </span>
              {details.email}
            </h1>
          </div>
        </div>
        <h2 className="mt-16 ml-8 font-bold underline text-4xl text-blue-400">
          Your Rooms:
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8 bg-blue-50">
          {room.length > 0 ? (
            room.map((room) => (
              <div
                key={room._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
                onClick={() => handleCardClick(room._id)}
              >
                <img
                  className="w-full h-48 object-cover"
                  src={room.frontimg }
                  alt={room.location}
                />
                <div className="p-4">
                  <h3 className="font-bold text-xl mb-2">{room.location}</h3>
                  <p className="text-gray-700">Price: ₹{room.price} / month</p>
                  <p className="text-gray-700">
                    Amenities: {room.amenities.join(", ")}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(room._id);
                    }}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No rooms available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default OwnerProfile;
