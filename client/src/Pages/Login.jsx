import React, { useContext, useState } from "react";
import { login } from "../Services/Auth"; // Ensure this path is correct
import { configContext } from "../Context/ConfigContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setDetails, setConfig } = useContext(configContext);
  const navigate = useNavigate();

  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginStatus("Logging in...");
    setError("");

    try {
      const res = await login(data);
      console.log('Login response:', res);

      if (!res || !res.accesstoken) {
        throw new Error("Unexpected response structure");
      }

      const token = res.accesstoken;
      sessionStorage.setItem("token", token);

      setConfig({
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const userDetails = await fetchUserDetails(token);
      setDetails(userDetails);

      navigate(userDetails.role === 'admin' ? '/ownerDashboard' : '/Roomseekers');

      setLoginStatus("Login successful!");
      toast.success("Login successful!");
      setData({ email: "", password: "" });
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setLoginStatus("");
      }, 3000);
    }
  };

  const fetchUserDetails = async (token) => {
    try {
      const res = await fetch("http://localhost:5000/user/infor", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error response from server:", errorText);
        throw new Error("Failed to fetch user details");
      }

      return await res.json();
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw error;
    }
  };

  return (
    <div className="relative w-screen h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {(loading || loginStatus || error) && (
        <div className={`absolute top-4 right-4 p-4 rounded-md shadow-lg ${error ? 'bg-red-500' : 'bg-gray-800'} text-white flex flex-col items-center`}>
          {loading && (
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 flex items-center justify-center">
                <IconLoading className="w-12 h-12" />
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-green-500">
                <div className="h-full bg-green-400 animate-loader"></div>
              </div>
            </div>
          )}
          <span className="mt-2 text-sm">{loginStatus}</span>
          {error && <span className="mt-2 text-sm">{error}</span>}
        </div>
      )}

      <div className="max-w-md w-full space-y-8">
        <div>
          {/* <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="" 
          /> */}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Log into your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-9">
            <div>
              <label htmlFor="email-address">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center h-10 items-center px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              {loading ? <IconLoading className="w-5 h-5" /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const IconLoading = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
    >
      <animateTransform
        attributeName="transform"
        dur="0.75s"
        repeatCount="indefinite"
        type="rotate"
        values="0 12 12;360 12 12"
      ></animateTransform>
    </path>
  </svg>
);

export default Login;
