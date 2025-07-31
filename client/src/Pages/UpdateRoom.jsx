import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


const UpdateRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState({
    location: "",
    price: "",
    amenities: [],
    additionalInformation:"",
    image: null,

  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
      
  const [success, setSuccess] = useState(false);


  const handle = (e) => {
        
    const { name, value } = e.target;
    setRoom({ ...room, [name]: value });
     }
    
     const handleImageChange = (e) => {
      const file = e.target.files[0];
      setRoom({ ...room, image: file });
    };
  
  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) throw new Error("Token not found");

        const res = await axios.get(
          ` http://localhost:5000/room/infoRoom/${roomId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRoom({
          location: res.data.location,
          price: res.data.price,
          amenities: res.data.amenities.join(", "),
          additionalInformation: res.data.additionalInformation || "",
          image: res.data.image || null,
        })
           console.log(res);
           
      } catch (error) {
        setError("Failed to load room detials", error)
      }
      finally {
        setLoading(false);
      }
    };
     fetchRoomDetails();
  }, [roomId])
    
  const handleChange = async (e) => {
    e.preventDefault();
    try {
        
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Token not found");

      const response = await axios.put(` http://localhost:5000/room/update/${roomId}`, {
        location: room.location,
        price: room.price,
        amenities: room.amenities.split(","),
        image: room.image,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
           }
      }
      )
      setSuccess(true);
      setTimeout(() => {
        navigate("/Profile");
      }, 1500);
      
    } catch (error) {
      setError(`Failed to update room details ${error.message}` );
      
     }
    
  }

  if (loading) return <p className="text-center">Loading...</p>
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  
 
  return (<>
  
    <form onSubmit={handleChange} action="">
    <input type="text" name="location" placeholder="loacation" value={room.location} onChange={handle} id="" />
      <input type="number" name="price" placeholder="price" id="" value={room.price} onChange={handle} />
      <input
          type="text"
          name="addiotionalInformation" 
          placeholder="Additional Information"
          value={room.addiotionalInformation}
          onChange={handle}
        />
    <input type="text" name="amenities" placeholder="amenities" value={room.amenities} onChange={handle} id="" />
      <input type="file" name="image"  id="" onChange={handleImageChange} />
        <button type="submit" >Update Room</button>
    </form> 

  </>)



  }

export default UpdateRoom;
