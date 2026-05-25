import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { configContext } from "../Context/ConfigContext";
import Home from "../assets/Home.jpg";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./adminDashboard";

const LandLordRooms = () => {
  const { details, id } = useContext(configContext);
  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Token is missing");

      const res = await axios.get(
        `http://localhost:5000/room/getRoomByOwner/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 20000,
        }
      );

      const roomData = res?.data || [];
      setRoom(roomData);
    } catch (error) {
      if (error.response) {
        toast.error(
          // `Error: ${error.response.status} - ${error.response.data?.msg || "Failed to fetch rooms"}`
        );
      } else {
        toast.error("Error fetching rooms: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (details && details.role === "landlord") {
      fetchRooms();
    } else {
      setLoading(false);
    }
  }, [details]);

  const handleCardClick = (roomId) => {
    navigate(`/room/${roomId}`);
  };

  const handleUpdateClick = (room) => {
    navigate("/updateroom", { state: room });
  };

  const handleDeleteClick = async (roomId) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;
    try {
      const token = sessionStorage.getItem("token");
      await axios.delete(`http://localhost:5000/room/delete/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 20000,
      });
      toast.success("Room deleted successfully");
      fetchRooms(); // Refresh the room list after deletion
    } catch (err) {
      toast.error(err.response?.data?.msg || "Delete failed");
    }
  };

  if (loading) return <p className="text-center mt-20 text-xl">Loading...</p>;
  if (!details) return <p>Please log in to view your rooms.</p>;
  if (details.role !== "landlord")
    return <p>You are not an owner, so you have no rooms.</p>;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Fixed width */}
      <div className="w-64 fixed h-full bg-white shadow-md">
        <AdminDashboard />
      </div>
      
      {/* Main Content - Offset by sidebar width */}
      <div className="ml-64 flex-1">
        <div className="h-full w-full">
          <h2 className="mt-8 ml-8 font-bold underline text-4xl text-blue-400">
            Your Rooms:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8 bg-blue-50">
            {room && room.length > 0 ? (
              room.map((room) => {
                const location =
                  typeof room.location === "string"
                    ? room.location
                    : room.location?.address || "Unknown";

                return (
                  <div
                    key={room._id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => handleCardClick(room._id)}
                  >
                    <img
                      className="w-full h-48 object-cover"
                      src={room.frontimg || Home}
                      alt={location}
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-xl mb-2">{location}</h3>
                      <p className="text-gray-700">Price: Rs.{room.price} / month</p>
                      <p className="text-gray-700">
                        Amenities: {room.amenities?.join(", ") || "None"}
                      </p>
                      <div className="flex justify-between mt-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpdateClick(room);
                          }}
                          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition"
                        >
                          Update
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(room._id);
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No rooms available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandLordRooms;