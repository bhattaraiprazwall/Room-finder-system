import React, { useEffect, useState, useContext } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { UserBooking } from "../Services/FetchBookedRooms";
import { AuthContext } from "../Context/AuthContext";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(loadingUser) return;
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError("");

        // Check if user is authenticated
        if (!user || !user._id) {
          setError("Please login to view your bookings");
          setLoading(false);
          return;
        }

        const result = await UserBooking(user._id);
        
        if (result?.success) {
          setBookings(result.data || []);
        } else {
          setError(result?.msg || "No bookings found.");
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Failed to fetch bookings. Please try again.");
        console.error("Booking fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]); // Re-fetch when user changes

  const handleRetry = () => {
    setError("");
    setLoading(true);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleLoginRedirect = () => {
    navigate("/login", { state: { from: "/my-bookings" } });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600">Loading your bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 max-w-md w-full">
          <p className="font-medium">{error}</p>
        </div>
        {error === "Please login to view your bookings" ? (
          <button
            onClick={handleLoginRedirect}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </button>
        ) : (
          <button
            onClick={handleRetry}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4 max-w-md w-full">
          <p className="font-medium">You haven't made any bookings yet</p>
        </div>
        <button
          onClick={() => navigate("/rooms")}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Browse Available Rooms
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        >
          Back
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden bg-white"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {booking.room?.title || "Room Booking"}
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  booking.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                  booking.status === "accepted" ? "bg-green-100 text-green-800" :
                  "bg-red-100 text-red-800"
                }`}>
                  {booking.status}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{booking.room?.location || "N/A"}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-medium">₹{booking.room?.price || "0"}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Booking Date</p>
                  <p className="font-medium">
                    {format(new Date(booking.bookingDate), "PPP")} at {booking.bookingTime}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Owner</p>
                  <p className="font-medium">{booking.owner?.name || "N/A"}</p>
                  <p className="text-sm text-gray-600">{booking.owner?.email || ""}</p>
                </div>
              </div>

              {booking.responseMessage && (
                <div className="mt-4 p-3 bg-gray-50 rounded">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Owner's Note:</span> {booking.responseMessage}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;