import { useState } from "react";
import { register } from "../Services/Auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({

    name: "",
    email: "",
    password: "",
    role: "",
    MobileNumber: "",
    img: null,
  })

  const handle = (e) => {

    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setData({ ...data, img: file });
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("email", data.email)
    formData.append("password", data.password)
    formData.append("role", data.role)
    formData.append("MobileNumber", data.MobileNumber)
    formData.append("img", data.img)
    const response = await register(formData)
    console.log(response);
    setData({
      name: "",
      email: "",
      password: "",
      role: "",
      MobileNumber: "",
      img: null
    })
    navigate("/login")
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your name"
              value={data.name}
              onChange={handle}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your email address"
              value={data.email}
              onChange={handle}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Your password"
              value={data.password}
              onChange={handle}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              type="number"
              name="MobileNumber"
              id="MobileNumber"
              placeholder="Your WhatsApp Number"
              value={data.MobileNumber}
              onChange={handle}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              name="role"
              id="role"
              value={data.role}
              onChange={handle}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a role</option>
              <option value="user">User</option>
              <option value="admin">Landlord</option>


            </select>
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Profile Picture
            </label>
            <input
              type="file"
              name="img"
              id="img"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-medium file:bg-gray-50 hover:file:bg-gray-100"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
