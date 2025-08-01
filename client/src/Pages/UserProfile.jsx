import { useContext, useEffect } from "react";
import { configContext } from "../Context/ConfigContext";
import { getUserDetails } from "../Services/getUserDetails";

const UserProfile = () => {
  const { details, setDetails } = useContext(configContext);
  console.log("details", details);

  // ✅ Define the function outside useEffect so it can be reused
  const handleViewUserDetail = async () => {
    try {
      const userDetail = await getUserDetails();
      console.log("Fetched User Detail:", userDetail);

      if (userDetail) {
        setDetails(userDetail); // ✅ set context
      }
    } catch (error) {
      console.log("Error fetching user detail:", error.message);
    }
  };

  // ✅ Call it on component mount
  useEffect(() => {
    handleViewUserDetail();
  }, []);

  return (
    <div className="h-screen w-full bg-gradient-to-r from-blue-100 to-blue-200 flex justify-center items-center">
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-sm w-full transition-transform hover:scale-105 duration-300">
        <div className="flex flex-col items-center">
          <img
            src={details?.img || "/default-avatar.png"}
            alt="User Avatar"
            className="rounded-full w-32 h-32 mb-4 shadow-lg border-4 border-blue-300"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-2 capitalize">
            {details?.name || "User Name"}
          </h2>
          <p className="text-gray-600 mb-4">{details?.email || "Email"}</p>
          <p className="text-gray-600 mb-4">{details?._id || "User ID"}</p>
          <p className="text-gray-600 mb-4">{details?.MobileNumber || "Mobile Number"}</p>

          <div className="flex flex-col items-center mt-4">
            <p className="text-gray-500 mb-2">
              <span className="font-semibold">Role:</span> {details?.role || "User"}
            </p>
            <p className="text-gray-500">
              <span className="font-semibold">Joined:</span>{" "}
              {details?.createdAt
                ? new Date(details.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

          {/* ✅ Button to manually refresh details */}
          <button
            onClick={handleViewUserDetail}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Refresh Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
