import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const Renter = () => {


    const [bookings, setBookings] = useState([]);
      
      const bookingId = 

    useEffect(() => {
      fetchBookings();
    }, []);
  
    const fetchBookings = async () => {
      const response = await fetch(`${API_URL}/bookresponse/:bookingId`);
      const data = await response.json();
      setBookings(data.bookings);
    };

    return (<>
      <div>
        {bookings.map((booking) => (
          <div key={booking.id}>
            <p>User: {booking.user.name}</p>
            <p>Room: {booking.room.name}</p>
            <button onClick={() => showAffidavitForm(booking)}>View Affidavit</button>
          </div>
        ))}
      </div>
    
    </>)


}

export default Renter;