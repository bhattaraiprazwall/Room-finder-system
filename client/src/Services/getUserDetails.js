import axios from "axios";

export const getUserDetails = async () => {
  console.log("Get User Details");

  try {
    const token = sessionStorage.getItem("token");
    console.log("Token display sjdgfiueagergfe",token); // no need to await here, it's synchronous

    const response = await axios.get("http://localhost:5000/user/infor", {
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
