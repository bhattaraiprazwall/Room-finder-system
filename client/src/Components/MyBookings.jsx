import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
import React, { useEffect, useState } from 'react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookedRooms = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const decoded = JSON.parse(atob(token.split('.')[1]));
        const ownerId = decoded.id;

        const response = await axios.get(
          `${API_URL}/book/myRooms/${ownerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching booked rooms:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookedRooms();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">My Bookings</h2>
        <p className="text-gray-600">Manage and view all your room bookings</p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <h3 className="text-xl font-medium text-gray-700 mt-4">No bookings found</h3>
          <p className="text-gray-500 mt-2">You don't have any bookings yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {booking.room?.location.address || "Unknown Location"}
                    </h3>
                    <p className="text-blue-600 font-medium mt-1">
                      Rs. {booking.room?.price || "0"}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      booking.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : booking.status === "accepted"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>
                      {new Date(booking.bookingDate).toLocaleDateString()} at {booking.bookingTime}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>
                      {booking.user?.name || "Guest"} ({booking.user?.email || "No email"})
                    </span>
                  </div>
                </div>

                {booking.responseMessage && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Note:</span> {booking.responseMessage}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;