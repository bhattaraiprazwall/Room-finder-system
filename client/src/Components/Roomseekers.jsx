// import { Link, useNavigate } from "react-router-dom";
// import "../Css/UserDash.css";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Footer from "../Pages/Footer";
// import EnhancedQuoteSection from "../Pages/EnhancedQuoteSection";
// import InfoBanner from "../Pages/InfoBanner";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Roomseekers = () => {
//   const [room, SetRoom] = useState([]);
//   const [filteredRooms, setFilteredRooms] = useState([]);
//   const [location, setLocation] = useState("");
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const fetchRooms = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/room/allRoom`);
//       const roomData = response.data;
//       SetRoom(roomData);
//       const randomRooms = [...roomData]
//         .sort(() => 0.5 - Math.random())
//         .slice(0, 9);
//       setFilteredRooms(randomRooms);
//       setLoading(false);
//       toast.success("Rooms loaded successfully");
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch rooms");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const reloaded = window.sessionStorage.getItem("reloadedOnce");

//     if (!reloaded) {
//       window.sessionStorage.setItem("reloadedOnce", "true");
//       window.location.reload();
//     } else {
//       fetchRooms();
//     }
//   }, []);

  // const handleSearch = async () => {
  //   if (!navigator.geolocation) {
  //     toast.error("Geolocation is not supported by your browser.");
  //     return;
  //   }

  //   navigator.geolocation.getCurrentPosition(
  //     async (position) => {
  //       const { latitude, longitude } = position.coords;

  //       try {
  //         const token = localStorage.getItem("token");
  //         const response = await fetch(
  //           `http://localhost:5000/room/nearby?lat=${latitude}&lng=${longitude}&radius=3`,
  //           {
  //             method: "GET",
  //             headers: {
  //               "Content-Type": "application/json",
  //               ...(token && { Authorization: `Bearer ${token}` }),
  //             },
  //           }
  //         );

  //         if (!response.ok) {
  //           toast.warn("No nearby rooms found");
  //           throw new Error("Failed to fetch nearby rooms");
  //         }

  //         const data = await response.json();

  //         const formattedRooms = data.data.map((room) => ({
  //           ...room,
  //           frontimg: room.frontimg || "default-image.jpg",
  //           location: room.location?.address || "Unknown location",
  //         }));

  //         setFilteredRooms(formattedRooms);
  //         toast.success("Nearby rooms fetched");
  //       } catch (error) {
  //         console.error("Error fetching nearby rooms:", error);
  //         setFilteredRooms([]);
  //         toast.error("Error fetching nearby rooms");
  //       }
  //     },
  //     (error) => {
  //       console.error("Geolocation error:", error);
  //       toast.error("Failed to get your location. Please enable location access.");
  //     }
  //   );
  // };


  //using geo code api ...

//   const handleSearch = async () => {
//   if (!location) {
//     toast.error("Please enter a location.");
//     return;
//   }

//   try {
//     const geocodeRes = await fetch(
//       `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=YOUR_OPENCAGE_API_KEY`
//     );
//     const geocodeData = await geocodeRes.json();

//     if (!geocodeData.results.length) {
//       toast.error("Location not found");
//       return;
//     }

//     const { lat, lng } = geocodeData.results[0].geometry;

//     const token = localStorage.getItem("token");
//     const response = await fetch(
//       `http://localhost:5000/room/nearby?lat=${lat}&lng=${lng}&radius=3`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token && { Authorization: `Bearer ${token}` }),
//         },
//       }
//     );

//     if (!response.ok) {
//       toast.warn("No nearby rooms found");
//       throw new Error("Failed to fetch nearby rooms");
//     }

//     const data = await response.json();

//     const formattedRooms = data.data.map((room) => ({
//       ...room,
//       frontimg: room.frontimg || "default-image.jpg",
//       location: room.location?.address || "Unknown location",
//     }));

//     setFilteredRooms(formattedRooms);
//     toast.success("Nearby rooms fetched");
//   } catch (error) {
//     console.error("Error fetching nearby rooms:", error);
//     toast.error("Failed to search nearby rooms");
//   }
// };

  
//   const handleViewDetails = (roomId) => {
//     navigate(`/roominUserSide/${roomId}`);
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <>
//       <div className="bg-gray-100 min-h-screen flex flex-col">
//         <div className="flex-grow">
//           <div>
//             <div className="flex justify-center mt-5">
//               <input
//                 className="px-44 py-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-italic placeholder-opacity-75"
//                 type="text"
//                 placeholder="Enter your location"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//               />
//               <button
//                 className="ml-4 px-8 py-3 rounded-2xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all duration-300"
//                 onClick={handleSearch}
//               >
//                 Search
//               </button>
//             </div>
//           </div>

//           <div className="grid grid-cols-3 gap-4 p-8">
//             {filteredRooms.length > 0 ? (
//               filteredRooms.map((room) => (
//                 <div key={room._id} className="bg-white p-4 rounded-lg shadow-lg">
//                   <img
//                     src={room.frontimg || "default-image.jpg"}
//                     alt={room.title || "Room"}
//                     className="w-full h-48 object-cover rounded-lg mb-4"
//                   />
//                   <h2 className="text-xl font-bold">{room.title}</h2>
//                   <p>
//                     {typeof room.location === "object"
//                       ? room.location.address ||
//                         `${room.location.coordinates?.[1]}, ${room.location.coordinates?.[0]}`
//                       : room.location}
//                   </p>
//                   <p className="font-semibold text-lg text-blue-600">Rs.{room.price}</p>
//                   <button
//                     className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300"
//                     onClick={() => handleViewDetails(room._id)}
//                   >
//                     View Details
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <p className="text-black text-center w-full">
//                 No rooms found for the location.
//               </p>
//             )}
//           </div>
//         </div>

//         <div className="mt-20">
//           <EnhancedQuoteSection />
//         </div>
//         <div className="mt-20">
//           <InfoBanner />
//         </div>
//         <div>
//           <Footer />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Roomseekers;

import { Link, useNavigate } from "react-router-dom";
import "../Css/UserDash.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../Pages/Footer";
import EnhancedQuoteSection from "../Pages/EnhancedQuoteSection";
import InfoBanner from "../Pages/InfoBanner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Leaflet & GeoSearch Imports
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

// Fix default icon issue in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// GeoSearch Component
const GeoSearchControlElement = ({ onSearchResult }) => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      autoComplete: true,
      autoCompleteDelay: 250,
      showMarker: true,
      showPopup: true,
      marker: {
        icon: new L.Icon.Default(),
        draggable: false,
      },
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: true,
    });

    map.addControl(searchControl);

    map.on("geosearch/showlocation", (result) => {
      const { location } = result;
      onSearchResult(location); // Call callback with selected location
    });

    return () => map.removeControl(searchControl);
  }, [map, onSearchResult]);

  return null;
};

const Roomseekers = () => {
  const [room, SetRoom] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchCoords, setSearchCoords] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchRooms = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/room/allRoom`);
      const roomData = response.data;
      SetRoom(roomData);
      const randomRooms = [...roomData]
        .sort(() => 0.5 - Math.random())
        .slice(0, 9);
      setFilteredRooms(randomRooms);
      setLoading(false);
      // toast.success("Rooms loaded successfully");
    } catch (error) {
      console.error(error);
      // toast.error("Failed to fetch rooms");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Handle search result from map
  const handleSearchResult = async (location) => {
    const { x: lng, y: lat, label } = location;
    setSearchCoords({ lat, lng });

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/room/nearby?lat=${lat}&lng=${lng}&radius=3`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      if (!response.ok) {
        toast.warn("No nearby rooms found");
        throw new Error("Failed to fetch nearby rooms");
      }

      const data = await response.json();

      const formattedRooms = data.data.map((room) => ({
        ...room,
        frontimg: room.frontimg || "default-image.jpg",
        location: room.location?.address || "Unknown location",
      }));

      setFilteredRooms(formattedRooms);
      
    } catch (error) {
      toast.warn("Room not found for  : " + label);
      console.error("Error fetching nearby rooms:", error);
      setFilteredRooms([]);
      // toast.error("Error fetching nearby rooms");
    }
  };

  const handleViewDetails = (roomId) => {
    navigate(`/roominUserSide/${roomId}`);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="flex-grow">
        <h1 className="text-center text-2xl font-bold py-5">Search Nearby Rooms</h1>

        {/* 🗺️ MAP SECTION */}
        <div className="mx-8 mb-10 rounded-lg overflow-hidden border-2 border-blue-300">
          <MapContainer
            center={[27.7172, 85.324]} // Kathmandu
            zoom={13}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoSearchControlElement onSearchResult={handleSearchResult} />

            {/* Optional: Show searched point */}
            {searchCoords && (
              <Marker position={[searchCoords.lat, searchCoords.lng]}>
                <Popup>Searched Location</Popup>
              </Marker>
            )}
          </MapContainer>
        </div>

        {/* 💼 ROOMS DISPLAY */}
        <div className="grid grid-cols-3 gap-4 p-8">
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room) => (
              <div key={room._id} className="bg-white p-4 rounded-lg shadow-lg">
                <img
                  src={room.frontimg || "default-image.jpg"}
                  alt={room.title || "Room"}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-bold">{room.title}</h2>
                <p>
                  {typeof room.location === "object"
                    ? room.location.address ||
                      `${room.location.coordinates?.[1]}, ${room.location.coordinates?.[0]}`
                    : room.location}
                </p>
                <p className="font-semibold text-lg text-blue-600">Rs.{room.price}</p>
                <button
                  className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300"
                  onClick={() => handleViewDetails(room._id)}
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p className="text-black text-center w-full">
              No rooms found for the searched location.
            </p>
          )}
        </div>
      </div>

      {/* BANNERS */}
      <div className="mt-20">
        <EnhancedQuoteSection />
      </div>
      <div className="mt-20">
        <InfoBanner />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Roomseekers;

