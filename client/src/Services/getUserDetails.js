import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getUserDetails = async () => {
  console.log("Get User Details");

  try {
    const token = sessionStorage.getItem("token");
    console.log("Token display sjdgfiueagergfe",token); // no need to await here, it's synchronous

    const response = await axios.get(`${API_URL}/user/infor`, {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Use backticks for string interpolation
      },
    });

    console.log("Display Users", response.data);
    return response.data;

  } catch (error) {
    console.error("Service error:", error.message);
  }
};
