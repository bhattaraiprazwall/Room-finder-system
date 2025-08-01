// import axios from "axios";

// const bookedRooms = async ({}) => {
//     const response = await axios.post("http://localhost:5000/landlord/booking-requests",{
     
//     });                                    
//   return response.data;
  
// };

// src/services/bookingService.js
import axios from "axios";

const API_URL = "http://localhost:5000/landlord";

export const getBookingRequests = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/booking-requests`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
    console.log("Display booking",response.data);

  return response.data;
};

export const acceptBooking = async (bookingId) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(
    `${API_URL}/booking-requests/${bookingId}/accept`,
    {},
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
  return response.data;
};

export const rejectBooking = async (bookingId) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(
    `${API_URL}/booking-requests/${bookingId}/reject`,
    {},
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
  console.log("Reject booking",response.data);
  return response.data;
  
};