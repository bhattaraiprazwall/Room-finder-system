import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { configContext } from "../Context/ConfigContext";
import axios from "axios";
import Home from "../assets/Home.jpg";

const RoomDetailsinUserSide = () => {
  const { roomId } = useParams();
  const { details } = useContext(configContext);
  console.log(details);

  const [room, setRoom] = useState(null);
  console.log(room);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestStatus, setRequestStatus] = useState(null);

  console.log(error);

  const fetchRooms = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("token not found");

      const res = await axios.get(
        `http://localhost:5000/room/infoRoom/${roomId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
       
      setRoom(res.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRooms();
  }, [roomId]);

  if (loading)
    return <p className="text-center text-xl text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!room)
    return (
      <p className="text-center text-gray-500">No room details available.</p>
    );

  const handleRequest = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Token not found");
      // const currentTime = new Date().toLocaleTimeString([], {
      //   hour: '2-digit',
      //   minute: '2-digit',
      // });
  
      const requset = await axios.post(
        `http://localhost:5000/book/bookrequest/${roomId}`,
        {
          roomId: roomId,
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
    } catch (error) {
      console.error(error.response);
      setError(error.response?.data?.message || error.message);
    }
  };

  return (
    <>
      {" "}
      <div className="bg-blue-50">
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                Owner Details
              </h1>
              <div className="flex items-center space-x-4">
                <img
                  src={details.img}
                  alt="Owner"
                  className="w-24 h-24 rounded-full shadow-md"
                />
                <div>
                  <p className="text-gray-600 text-lg">Name:{details.name}</p>{" "}
                  {/* Ensure details contain correct data */}
                  <p className="text-gray-600 text-lg">Role: {details.role}</p>
                  <p className="text-gray-600 text-lg">
                    Email: {details.email}
                  </p>
                  <p className="text-gray-600 text-lg">
                    Mobile Number: {details.MobileNumber}
                  </p>
                </div>
              </div>
            </div>

            {/* Room Details Section */}
            <div>
              <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                Room Details
              </h1>
              <img
                src={room.frontimg}
                alt="Room"
                className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
              />
              <div className="text-gray-600 space-y-2">
                <p className="text-lg">Location: {room.location}</p>
                <p className="text-lg">Room ID: {room._id}</p>
                <p className="text-lg">Owner: {details.name}</p>{" "}
                <p className="text-lg">Owner ID: {room.owner}</p>{" "}
                <p className="text-lg">Price: ₹{room.price}</p>
                {/* <p className="text-lg">
                  Amenities: {room.amenities.join(", ")}
                </p> */}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Room Video Tour
            </h2>
            <div className="relative w-full h-64 md:h-80">
              <iframe
                className="w-full h-full rounded-lg shadow-md"
                src={room.video}
                title="Room Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Additional Room Details or Footer */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Additional Information
            </h2>
            <p className="text-gray-600">{room.additionalInformation}</p>
          </div>
  
          <div>
          {requestStatus && (
          <p className={`text-center text-xl mt-4 ${requestStatus.startsWith('Error') ? 'text-red-500' : 'text-green-500'}`}>
            {requestStatus}
          </p>
        )}
            <button
              className=" px-20 py-4 rounded-lg animate-pulse hover:animate-none font-bold ml-[38%] mt-5 bg-blue-500"
              onClick={handleRequest}
            >
              Book Room
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default RoomDetailsinUserSide;
