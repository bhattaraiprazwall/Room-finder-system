import { useEffect, useState } from "react";

const Renter = () => {


    const [bookings, setBookings] = useState([]);
       
      const bookingId = 

    useEffect(() => {
      fetchBookings();
    }, []);
  
    const fetchBookings = async () => {
      const response = await fetch('http://localhost:5000/bookresponse/:bookingId');
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