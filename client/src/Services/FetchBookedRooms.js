
import axios from "axios";

const API_URL = "http://localhost:5000/landlord";

// export const getBookingRequests = async () => {
//   const token = await localStorage.getItem('token');
//   console.log("fetch booed room service");
//   const response = await axios.get(`http://localhost:5000/book/booking-requests`, {
//     headers: {
//        Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     }
//   });
//     console.log("Display booking",response);
//   const data = response.json();
//   return data;
// };
export const getBookingRequests = async () => {
  console.log("fetch booked room service");
 try {
   
 const response = await axios.get(`http://localhost:5000/book/booking-requests`);  
   console.log("Display booking", response.data);
   return response.data;
 } catch (error) {
  console.log("service errro", error.message)
 }
};


export const acceptBooking = async (bookingId) => {
  const token =await localStorage.getItem('token');
    console.log("acceprt service:", token, bookingId)

  const response = await axios.get(
    `http://localhost:5000/book/bookings/${bookingId}/accept`,
    {},
    // {
    //   headers: {
    //     'Authorization': `Bearer ${token}`
    //   }
    // }
  );
  return response.data;
};

export const rejectBooking = async (bookingId) => {
  const token = localStorage.getItem('token');
  console.log("rejsect service:", token, bookingId)
  const response = await axios.get(
    `http://localhost:5000/book/bookings/${bookingId}/reject`,
    {},
    {
      // headers: {
      //   'Authorization': `Bearer ${token}`
      // }
    }
  );
  console.log("Reject booking",response.data);
  return response.data;
  
 };