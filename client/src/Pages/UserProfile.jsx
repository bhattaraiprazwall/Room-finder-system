import { useContext, useEffect } from "react";
import { configContext } from "../Context/ConfigContext";
import { getUserDetails } from "../Services/getUserDetails";

const UserProfile = () => {
  const { details, setDetails } = useContext(configContext);
  console.log("details", details);

  const handleViewUserDetail = async () => {
    try {
      const userDetail = await getUserDetails();
      console.log("Fetched User Detail:", userDetail);

      if (userDetail) {
        setDetails(userDetail);
      }
    } catch (error) {
      console.log("Error fetching user detail:", error.message);
    }
  };

  useEffect(() => {
    handleViewUserDetail();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-900 flex justify-center items-center p-4">
      <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-700 shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
        <div className="flex flex-col items-center">
          <div className="relative mb-6">
            <img
              src={details?.img || "/default-avatar.png"}
              alt="User Avatar"
              className="rounded-full w-36 h-36 object-cover ring-4 ring-purple-500/30 hover:ring-purple-500/50 transition-all"
            />
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              {details?.role || "User"}
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-1 capitalize">
            {details?.name || "User Name"}
          </h2>
          <p className="text-purple-400 mb-6">{details?.email || "Email"}</p>

          <div className="w-full space-y-3 mb-6">
            {/* <div className="flex justify-between border-b border-gray-700 pb-2">
              <span className="text-gray-400">User ID</span>
              <span className="text-gray-300 font-mono">{details?._id || "N/A"}</span>
            </div> */}
            <div className="flex justify-between border-b border-gray-700 pb-2">
              <span className="text-gray-400">Mobile</span>
              <span className="text-gray-300">{details?.MobileNumber || "N/A"}</span>
            </div>
            <div className="flex justify-between border-b border-gray-700 pb-2">
              <span className="text-gray-400">Joined</span>
              <span className="text-gray-300">
                {details?.createdAt
                  ? new Date(details.createdAt).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </div>

          <button
            onClick={handleViewUserDetail}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;