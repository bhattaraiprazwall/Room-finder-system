import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Home from "../assets/Home.jpg"; // fallback image

const RoomDetailsinUserSide = () => {
  const { roomId } = useParams();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestStatus, setRequestStatus] = useState(null);

  // Fetch room with populated owner
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

      const request = await axios.post(
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

      setRequestStatus("Your booking request has been sent successfully!");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message);
    }
  };

  if (loading)
    return <p className="text-center text-xl text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!room)
    return (
      <p className="text-center text-gray-500">No room details available.</p>
    );

  const { owner = {}, location, price, frontimg, video, _id, additionalInformation, amenities } = room;

  return (
    <div className="bg-blue-50">
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Owner Section */}
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">
              Landlord Details
            </h1>
            <div className="flex items-center space-x-4">

              <div>
                <p className="text-gray-600 text-lg">Name: {owner.name || "N/A"}</p>
                <p className="text-gray-600 text-lg">Mobile: {owner.MobileNumber || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Room Section */}
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">
              Room Details
            </h1>
            <img
              src={frontimg}
              alt="Room"
              className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
            />
            <div className="text-gray-600 space-y-2">
              <p className="text-lg">Location: {location}</p>
              <p className="text-lg">Price: ₹{price}</p>
            </div>
          </div>
        </div>




        {/* Additional Info */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Additional Information
          </h2>

          {/* Amenities List */}
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Amenities:</h3>
            {amenities && amenities.length > 0 ? (
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {amenities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No amenities listed.</p>
            )}
          </div>

          {/* Additional Info Text */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Description:</h3>
            <p className="text-gray-600">{additionalInformation || "No additional info."}</p>
          </div>
        </div>


        {/* Video Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Room Video Tour
          </h2>
          <div className="relative w-full h-64 md:h-80">
            <iframe
              className="w-full h-full rounded-lg shadow-md"
              src={video}
              title="Room Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>


        {/* Booking Status & Button */}
        <div className="mt-8 text-center">
          {requestStatus && (
            <p
              className={`text-xl mb-4 ${requestStatus.startsWith("Error")
                ? "text-red-500"
                : "text-green-500"
                }`}
            >
              {requestStatus}
            </p>
          )}
          <button
            onClick={handleRequest}
            className="px-8 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200"
          >
            Book Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsinUserSide;
