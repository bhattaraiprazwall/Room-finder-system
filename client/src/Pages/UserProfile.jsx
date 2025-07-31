import { useContext } from "react";
import { configContext } from "../Context/ConfigContext";

const UserProfile = () => {
  const { details } = useContext(configContext);
  console.log(details);

  return (
    <>
      <div className="h-screen w-full bg-gradient-to-r from-blue-100 to-blue-200 flex justify-center items-center">
        <div className="bg-white shadow-2xl rounded-lg p-8 max-w-sm w-full transition-transform hover:scale-105 duration-300">
          <div className="flex flex-col items-center">
            <img
              src={details.img}
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
                <span className="font-semibold">Joined:</span> {new Date(details?.createdAt).toLocaleDateString() || "N/A"}
              </p>
            </div>
          </div>
              </div>
             
      </div>
    </>
  );
};

export default UserProfile;
