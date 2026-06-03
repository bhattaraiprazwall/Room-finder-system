import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getBookingRequests = async () => {
  console.log("fetch booked room service");
 try {
   
 const response = await axios.get(`${API_URL}/book/booking-requests`);  
   console.log("Display booking", response.data);
   return response.data;
 } catch (error) {
  console.log("service errro", error.message)
 }
};


export const acceptBooking = async (bookingId) => {
  const token = sessionStorage.getItem('token');
    console.log("accept service:", token, bookingId)

  const response = await axios.get(
    `${API_URL}/book/bookings/${bookingId}/accept`,
    {},
    // {
    //   headers: {
    //     'Authorization': Bearer ${token}
    //   }
    // }
  );
  return response.data;
};

export const rejectBooking = async (bookingId) => {
  const token = sessionStorage.getItem('token');
  console.log("rejsect service:", token, bookingId)
  const response = await axios.get(
    `${API_URL}/book/bookings/${bookingId}/reject`,
    {},
    {
      // headers: {
      //   'Authorization': Bearer ${token}
      // }
    }
  );
  console.log("Reject booking",response.data);
  return response.data;
  
 };