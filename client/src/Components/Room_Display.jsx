import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getBookingRequests,
  acceptBooking,
  rejectBooking,
} from '../Services/FetchBookedRooms';

const BookedRoomsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchBookedRooms = async () => {
    try {
      const data = await getBookingRequests();
      setBookings(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load booked rooms');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookedRooms();
  }, []);

  const handleAccept = async (bookingId) => {
    try {
      await acceptBooking(bookingId);
      fetchBookedRooms();
    } catch (err) {
      setError('Failed to accept booking');
    }
  };

  const handleReject = async (bookingId) => {
    try {
      await rejectBooking(bookingId);
      fetchBookedRooms();
    } catch (err) {
      setError('Failed to reject booking');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Booking Requests</h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        >
          Back
        </button>
      </div>

      {(!bookings || bookings.length === 0) ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No booking requests found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white rounded-lg shadow-md p-6 border">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {booking.room?.title || 'Room Booking'}
                </h2>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  booking.status === 'accepted' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                  {booking.status}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{booking.room?.location || 'N/A'}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-medium">${booking.room?.price || '0'} per night</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Requested by</p>
                  <p className="font-medium">{booking.user?.name || 'Guest'}</p>
                  <p className="text-sm text-gray-600">{booking.user?.email || ''}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Booking Date</p>
                  <p className="font-medium">
                    {new Date(booking.bookingDate).toLocaleDateString()} at {booking.bookingTime}
                  </p>
                </div>
              </div>

              {booking.status === 'pending' && (
                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={() => handleAccept(booking._id)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(booking._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedRoomsPage;
