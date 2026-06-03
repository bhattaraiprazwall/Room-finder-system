import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import Home from "../assets/Home.jpg";
import { toast } from "react-toastify";

const DateModal = ({ isOpen, onClose, onSubmit }) => {
  const [dates, setDates] = useState({ startDate: "", endDate: "" });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setDates({ ...dates, [e.target.name]: e.target.value });
  };
  console.log("first",dates);

  const handleSubmit = (e) => {
    e.preventDefault();
      console.log("dateeeeeeeee", dates);
    // ✅ Validation: startDate must be less than endDate
     if (new Date(dates.startDate) >= new Date(dates.endDate))return alert("Start date must be earlier than end date.");
    onSubmit(dates); // ✅ send dates to parent
    onClose(); // ✅ close modal after submitting
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Select Booking Dates</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={dates.startDate}
              onChange={handleChange}
              className="border rounded w-full px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm">End Date</label>
            <input
              type="date"
              name="endDate"
              value={dates.endDate}
              onChange={handleChange}
              className="border rounded w-full px-3 py-2"
              required
            />
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit" // ✅ triggers handleSubmit
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const RoomDetailsinUserSide = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestStatus, setRequestStatus] = useState(null);
  const [showDateModal, setShowDateModal] = useState(false);

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
        `${API_URL}/room/infoRoom/${roomId}`,
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

  const getNepalTime = () => {
    const nowUTC = new Date();
    const nepalOffsetMinutes = (5 * 60) + 45;
    const nepalTime = new Date(nowUTC.getTime() + nepalOffsetMinutes * 60 * 1000);

    let hours = nepalTime.getUTCHours();
    let minutes = nepalTime.getUTCMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;
    minutes = String(minutes).padStart(2, "0");

    return `${hours}:${minutes} ${ampm}`;
  };

  const handleRequest = async (dates) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Token not found");

      await axios.post(
        `${API_URL}/book/bookrequest/${roomId}`,
        {
          roomId,
          startDate: dates.startDate,
          endDate: dates.endDate,
          bookingTime: getNepalTime(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          
        }

      );
      // console.log("start date,enddate",startDate,endDate);

      toast.success("Your booking request has been sent successfully.");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl text-gray-600">
          Loading room details...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl p-6 bg-red-50 rounded-lg max-w-md text-center">
          Error: {error}
        </div>
      </div>
    );

  if (!room)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500 text-xl">No room details available.</div>
      </div>
    );

  const {
    owner = {},
    location,
    price,
    frontimg,
    video,
    amenities,
    additionalInformation,
  } = room;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative h-64 md:h-80 w-full">
            <img
              src={frontimg || Home}
              alt="Room"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h1 className="text-3xl font-bold text-white">Room Details</h1>
              <p className="text-gray-200 mt-1">
                {formatLocation(location.address)}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 p-6">
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
                    <p className="font-medium">
                      {owner.MobileNumber || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Overview
                </h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="text-2xl font-bold text-indigo-600">
                      Rs.{price}
                    </p>
                  </div>
                </div>

                <h3 className="text-lg font-medium text-gray-700 mb-3">
                  Description
                </h3>
                <p className="text-gray-600">
                  {additionalInformation ||
                    "No additional description provided."}
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-700 mb-3">
                  Amenities
                </h3>
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
                <h3 className="text-lg font-medium text-gray-700 mb-3">
                  Video Tour
                  
                </h3>
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
                  <div
                    className={`mb-6 p-4 rounded-lg ${
                      requestStatus.startsWith("Error")
                        ? "bg-red-50 text-red-600"
                        : "bg-green-50 text-green-600"
                    }`}
                  >
                    {requestStatus}
                  </div>
                )}
                <button
                  onClick={() => setShowDateModal(true)}
                  className="w-full md:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition duration-200 flex items-center justify-center gap-2"
                >
                  Book This Room
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DateModal
        isOpen={showDateModal}
        onClose={() => setShowDateModal(false)}
        onSubmit={handleRequest} // ✅ booking happens here
      />
    </div>
  );
};

export default RoomDetailsinUserSide;
