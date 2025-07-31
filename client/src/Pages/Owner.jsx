import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { configContext } from "../Context/ConfigContext";

const Owner = () => {
  const { details } = useContext(configContext);

  const [data, setData] = useState({
    location: "",
    price: "",
    amenities: "",
    additionalInformation: "",
    frontimg: null,
    video: null,
  });

  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setData({ ...data, frontimg: file });
  };

  const handleChangeVideo = (e) => {
    const file = e.target.files[0];
    setData({ ...data, video: file });
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
      console.log("Form submitted"); // <-- ✅ Add this

      

    if (!token) {
      console.log("running...");
      toast.error("No authentication token found.");
      return;
    }
    

    if (!details || !details._id) {
      toast.error("Owner details not found.");
      return;
    }

    // if (data.price < 1) {
    //   toast.error("Price must be a positive number.");
    //   return;
    // }
     
    const formData = new FormData();
    formData.append("location", data.location);
    formData.append("price", data.price);
    formData.append("additionalInformation", data.additionalInformation);
    formData.append("frontimg", data.frontimg);
    formData.append("owner", details._id);

    // Append amenities one by one
    const amenitiesArray = data.amenities.split(",").map((a) => a.trim());
    amenitiesArray.forEach((a, index) => {
      formData.append(`amenities[${index}]`, a);
    });

    if (data.video) {
      formData.append("video", data.video);
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/room/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Room added successfully!");

      // Reset form
      setData({
        location: "",
        price: "",
        amenities: "",
        additionalInformation: "",
        frontimg: null,
        video: null,
      });
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error("Error creating room: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 underline">Create Your Rooms</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              required
              name="location"
              placeholder="Room location in details"
              onChange={handleChange}
              value={data.location}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              required
              name="price"
              placeholder="Price"
              onChange={handleChange}
              value={data.price}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Amenities</label>
            <input
              type="text"
              required
              name="amenities"
              placeholder="Amenities (comma-separated)"
              onChange={handleChange}
              value={data.amenities}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Additional Information</label>
            <input
              type="text"
              required
              name="additionalInformation"
              placeholder="Your Conditions or additional information"
              onChange={handleChange}
              value={data.additionalInformation}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Home Front Image</label>
            <input
              type="file"
              required
              name="frontimg"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Room Video</label>
            <input
              type="file"
              name="video"
              onChange={handleChangeVideo}
              className="mt-1 block w-full text-sm text-gray-500"
            />
          </div>
          <button
            className="w-full mt-8 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Owner;
