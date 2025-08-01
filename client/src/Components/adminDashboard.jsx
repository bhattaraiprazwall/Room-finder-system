// src/pages/landlord/AdminDashboard.jsx
import React, { useContext } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const AdminDashboard = () => {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

const navigate = useNavigate();
const handleLogout = () => {
    logout(); // make sure your logout clears user state in context!
    navigate("/login");
  };
  const navLinkClass = (path) =>
    `px-4 py-2 rounded-md hover:bg-slate-600 transition ${location.pathname.includes(path) ? 'bg-slate-700 font-semibold' : ''
    }`;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-10 text-center">RoomFinder</h2>
        <nav className="flex flex-col gap-4">
          <Link to="/RoomCreate" className={navLinkClass('add-room')}>Add Room</Link>
          <Link to="/admin/my-rooms" className={navLinkClass('my-rooms')}>My Rooms</Link>
          <Link to="/landlord/booking-requests" className={navLinkClass('booking-requests')}>Booking Requests</Link>
          <Link to="/profile" className={navLinkClass('profile')}>Profile</Link>
          <Link to="/" onClick={handleLogout} className="px-4 py-2 rounded-md hover:bg-red-600 transition">Logout</Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-gray-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
