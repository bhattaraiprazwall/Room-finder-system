import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Home from "../assets/Home.jpg";
import {toast} from "react-toastify";

const RoomDetailsinUserSide = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestStatus, setRequestStatus] = useState(null);

  const formatLocation = (loc) => {
    if (!loc) return "Unknown location";
    if (typeof loc === "string") return loc;
    if (loc.coordinates && loc.coordinates.length === 2) {
      return `${loc.coordinates[1]}, ${loc.coordinates[0]}`;
    }
    return "Unknown location";
  };

  const fetchRoom = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Token not found");

      const res = await axios.get(
        `http://localhost:5000/room/infoRoom/${roomId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRoom(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoom();
  }, [roomId]);

  const handleRequest = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Token not found");

      await axios.post(
        `http://localhost:5000/book/bookrequest/${roomId}`,
        {
          roomId,
          bookingDate: new Date(),
          bookingTime: "10:20 AM",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // setRequestStatus("Your booking request has been sent successfully!");
      toast.success("Your booking request has been sent successfully..");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-xl text-gray-600">Loading room details...</div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-red-500 text-xl p-6 bg-red-50 rounded-lg max-w-md text-center">
        Error: {error}
      </div>
    </div>
  );
  
  if (!room) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-gray-500 text-xl">No room details available.</div>
    </div>
  );

  const { owner = {}, location, price, frontimg, video, amenities, additionalInformation } = room;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header with image */}
          <div className="relative h-64 md:h-80 w-full">
            <img
              src={frontimg || Home}
              alt="Room"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h1 className="text-3xl font-bold text-white">Room Details</h1>
              <p className="text-gray-200 mt-1">{formatLocation(location.address)}</p>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-3 gap-8 p-6">
            {/* Left Column - Owner Info */}
            <div className="md:col-span-1">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                  Landlord Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{owner.name || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="font-medium">{owner.MobileNumber || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Room Details */}
            <div className="md:col-span-2">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Overview</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="text-2xl font-bold text-indigo-600">Rs.{price}</p>
                  </div>
                </div>

                <h3 className="text-lg font-medium text-gray-700 mb-3">Description</h3>
                <p className="text-gray-600">
                  {additionalInformation || "No additional description provided."}
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-700 mb-3">Amenities</h3>
                {amenities && amenities.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {amenities.map((item, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No amenities listed</p>
                )}
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-700 mb-3">Video Tour</h3>
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                  <iframe
                    className="w-full h-64 md:h-80"
                    src={video}
                    title="Room Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              <div className="border-t pt-6">
                {requestStatus && (
                  <div className={`mb-6 p-4 rounded-lg ${
                    requestStatus.startsWith("Error") 
                      ? "bg-red-50 text-red-600" 
                      : "bg-green-50 text-green-600"
                  }`}>
                    {requestStatus}
                  </div>
                )}
                <button
                  onClick={handleRequest}
                  className="w-full md:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition duration-200 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  Book This Room
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsinUserSide;