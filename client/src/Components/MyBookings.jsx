import React, { useEffect, useState } from 'react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Dummy data — replace with real API call
    const dummyBookings = [
      {
        id: 1,
        roomName: "Deluxe Room",
        location: "Kathmandu, Nepal",
        checkIn: "2025-08-10",
        checkOut: "2025-08-15",
      },
      {
        id: 2,
        roomName: "Standard Room",
        location: "Pokhara, Nepal",
        checkIn: "2025-09-01",
        checkOut: "2025-09-03",
      }
    ];

    setBookings(dummyBookings);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-6">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="border border-gray-300 rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-blue-600">{booking.roomName}</h3>
              <p className="text-gray-700 mt-1">
                <span className="font-medium">Location:</span> {booking.location}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Check-in:</span> {booking.checkIn}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Check-out:</span> {booking.checkOut}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
