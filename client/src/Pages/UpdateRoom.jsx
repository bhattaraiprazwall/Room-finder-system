import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import { toast } from "react-toastify";
import { configContext } from "../Context/ConfigContext";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateRoom = () => {
  const { id } = useContext(configContext); // Logged-in landlord ID
  const location = useLocation();
  const navigate = useNavigate();
  const room = location.state;
  console.log("room show", room);
  const [formData, setFormData] = useState({
    owner: room?.owner || id,
    location: room?.location || "",
    price: room?.price || "",
    amenities: room?.amenities || "",
    additionalInformation: room?.additionalInformation || "",
  });

  const [roomId, setroomId] = useState(room?._id || null);
  const token = sessionStorage.getItem("token");


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${API_URL}/room/update/${roomId}`,
        formData,
        {
        headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 20000,
        }
        
      );
      toast.success(res.data.msg || "Room updated successfully");
      navigate("/landlord/my-rooms");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Update failed");
    }
  };

  const handleCancel = async () => {
    // if (!window.confirm("Are you sure you want to delete this room?")) return;
    // try {
    //   await axios.delete(`http://localhost:5000/room/delete/${roomId}`);
    //   toast.success("Room deleted successfully");
    navigate("/landlord/my-rooms");
    // } catch (err) {
    //   toast.error(err.response?.data?.msg || "Delete failed");
    // }
  };

  if (!room) return <p className="text-center mt-10">No room selected.</p>;

  return (
    <div className="h-full w-full bg-blue-50">
      <h2 className="mt-16 ml-8 font-bold underline text-4xl text-blue-400">
        Update Room
      </h2>

      <div className="max-w-2xl mx-auto p-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <form onSubmit={handleUpdate} className="p-6">
            {/* <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Owner ID
              </label>
              <input
                type="text"
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled
              />
            </div> */}

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Price (Rs.)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Amenities (comma separated)
              </label>
              <input
                type="text"
                name="amenities"
                value={formData.amenities}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Additional Information
              </label>
              <textarea
                name="additionalInformation"
                value={formData.additionalInformation}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateRoom;