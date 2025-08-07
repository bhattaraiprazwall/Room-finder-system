import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConfigContextProvider from "./Context/ConfigContext";
import { AuthContext, AuthProvider } from "./Context/AuthContext";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import OwnerDashboard from "./Components/Ownerdashboard";
import Roomseekers from "./Components/Roomseekers";
import OwnerProfile from "./Pages/OwnerProfile";
import Owner from "./Pages/Owner";
import RoomDetails from "./Pages/RoomDetails";
import UpdateRoom from "./Pages/UpdateRoom";
import Renter from "./Pages/Renter";
import UserProfile from "./Pages/UserProfile";
import RoomDetailsinUserSide from "./Pages/RoomDetailsinUserSide";
import LandingPage from "./Pages/LandingPage";
import Navbar from "./Components/Navbar";
import AdminDashboard from "./Components/adminDashboard";
import AuthorizationGuard from "./Components/Authentication";

import MyBookings from "./Components/MyBookings";
import BookedRoomsPage from "./Components/BookingRequestLandlord";
import LandLordRooms from "./Components/LandLordRooms";
import LocationPicker from "./Components/GoogleMapPicker";
import NearbyRooms from "./views/rooms/NearbyRooms";
import { ToastContainer } from "react-toastify";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLoginPage from "./Pages/adminLogin.page";
import ViewRoomsToAdmin from "./Pages/viewRoomToAdmin";




// Separate component to safely handle navbar rendering
const NavbarWrapper = () => {
  const { user } = React.useContext(AuthContext);

  // Show navbar for:
  // - Non-admin users (when user exists and role isn't admin)
  // - Public pages (when user is null)
  return user?.role !== "landlord" || user?.role !== "admin" ? <Navbar /> : null;
};

const App = () => {
  return (
    <AuthProvider>
      <ConfigContextProvider>
        <Router>
          <div className="bg-blue-50">
            <ToastContainer position="top-right" autoClose={3000} />
            <NavbarWrapper />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/room/:roomId" element={<RoomDetails />} />
              <Route path="/roomInUserSide/:roomId" element={<RoomDetailsinUserSide />} />
              <Route path="/profile" element={<OwnerProfile />} />
              <Route path="/googlemap" element={<LocationPicker />} />
              <Route path="/nearby" element={<NearbyRooms />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin/viewRooms" element={<ViewRoomsToAdmin />} />

              {/* Admin only routes */}
              <Route
                path="/landlord/my-rooms"
                element={
                  <AuthorizationGuard allowedRoles={["landlord"]}>
                    <LandLordRooms />
                  </AuthorizationGuard>
                }
              />
              <Route
                path="/landlord"
                element={
                  <AuthorizationGuard allowedRoles={["landlord"]}>
                    <AdminDashboard />
                  </AuthorizationGuard>
                }
              />
              <Route
                path="/RoomCreate"
                element={
                  <AuthorizationGuard allowedRoles={["landlord"]}>
                    <Owner />
                  </AuthorizationGuard>
                }
              />
              <Route
                path="/landlord/booking-requests"
                element={
                  <AuthorizationGuard allowedRoles={["landlord"]}>
                    <BookedRoomsPage />
                  </AuthorizationGuard>
                }
              />



              {/* Owner/user routes */}
              <Route
                path="/OwnerDashboard"
                element={
                  <AuthorizationGuard allowedRoles={["user"]}>
                    <OwnerDashboard />
                  </AuthorizationGuard>
                }
              />
              <Route
                path="/Profile"
                element={
                  <AuthorizationGuard allowedRoles={["user"]}>
                    <OwnerProfile />
                  </AuthorizationGuard>
                }
              />
              <Route
                path="/updateroom"
                element={
                  <AuthorizationGuard allowedRoles={["landlord"]}>
                    <UpdateRoom />
                  </AuthorizationGuard>
                }
              />
              <Route
                path="/RoomSeekers"
                element={
                  <AuthorizationGuard allowedRoles={["user"]}>
                    <Roomseekers />
                  </AuthorizationGuard>
                }
              />
              <Route
                path="/bookings"
                element={
                  <AuthorizationGuard allowedRoles={["user"]}>
                    <MyBookings />
                  </AuthorizationGuard>
                }
              />

              {/* Renter routes */}
              <Route
                path="/renter"
                element={
                  <AuthorizationGuard allowedRoles={["user"]}>
                    <Renter />
                  </AuthorizationGuard>
                }
              />
              <Route
                path="/UserProfile"
                element={
                  <AuthorizationGuard allowedRoles={["user"]}>
                    <UserProfile />
                  </AuthorizationGuard>
                }
              />
            </Routes>
          </div>
        </Router>
      </ConfigContextProvider>
    </AuthProvider>
  );
};

export default App;