import React, { useContext, useState, useEffect } from "react";
import { configContext } from "../Context/ConfigContext";
import { toast } from "react-toastify";
import GoogleMapPicker from "../Components/GoogleMapPicker";
import { useNavigate } from "react-router-dom";

const Owner = () => {
  const { details } = useContext(configContext);
  const [showMap, setShowMap] = useState(false);
  const [token, setToken] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const navigate=useNavigate();

  const [data, setData] = useState({
    location: "",
    price: "",
    amenities: "",
    additionalInformation: "",
    frontimg: null,
    video: null,
    Longitude: "",
    Latitude: "",
  });

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      try {
        const decoded = JSON.parse(atob(storedToken.split('.')[1]));
        setOwnerId(decoded.id); // Set owner ID from token
      } catch (err) {
        toast.error("Invalid token.");
      }
    } else {
      toast.error("User not authenticated.");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLocationSelect = (coords) => {
    setData((prev) => ({
      ...prev,
      Latitude: coords.lat.toString(),
      Longitude: coords.lng.toString(),
    }));
    setShowMap(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ownerId) {
      toast.error("Owner ID not found.");
      return;
    }

    const form = new FormData();
    for (const key in data) {
      form.append(key, data[key]);
    }

    form.append("owner", ownerId); // ✅ Append owner ID

    try {
      const res = await fetch("http://localhost:5000/room/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });
//  toast.success("Room Added Successfully first");
      const result = await res.json();
      if (res.ok) {
        toast.success("Room Added Successfully");
        setData({
          location: "",
          price: "",
          amenities: "",
          additionalInformation: "",
          frontimg: null,
          video: null,
          Longitude: "",
          Latitude: "",
        });
        navigate("/landlord/my-rooms");
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network Error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Room</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="location"
          value={data.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          value={data.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="text"
          name="amenities"
          value={data.amenities}
          onChange={handleChange}
          placeholder="Amenities"
          className="w-full px-3 py-2 border rounded"
        />
        <textarea
          name="additionalInformation"
          value={data.additionalInformation}
          onChange={handleChange}
          placeholder="Additional Information"
          className="w-full px-3 py-2 border rounded"
        ></textarea>

        <div className="flex gap-2">
          <input
            type="file"
            name="frontimg"
            accept="image/*"
            onChange={handleChange}
            className="w-1/2"
          />
          <input
            type="file"
            name="video"
            accept="video/*"
            onChange={handleChange}
            className="w-1/2"
          />
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            name="Latitude"
            value={data.Latitude}
            readOnly
            className="w-1/2 px-3 py-2 border rounded bg-gray-100"
            placeholder="Latitude"
          />
          <input
            type="text"
            name="Longitude"
            value={data.Longitude}
            readOnly
            className="w-1/2 px-3 py-2 border rounded bg-gray-100"
            placeholder="Longitude"
          />
        </div>

        <button
          type="button"
          className="bg-blue-600 text-white px-4 py-2 rounded mx-10"
          onClick={() => setShowMap(true)}
        >
          Choose Location on Map
        </button>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit
        </button>
      </form>

      {/* Map Modal */}
      {showMap && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
            <GoogleMapPicker onLocationSelect={handleLocationSelect} />
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => setShowMap(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Owner;
