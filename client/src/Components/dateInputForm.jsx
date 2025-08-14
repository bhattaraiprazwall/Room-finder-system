

// DateModal.jsx
import React, { useState } from "react";

const DateModal = ({ isOpen, onClose, onSubmit }) => {
  const [dates, setDates] = useState({ startDate: "", endDate: "" });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setDates({ ...dates, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
        console.log("dateeeeeeeee", dates);
    // ✅ Validation: startDate must be less than endDate
     if (new Date(dates.startDate) >= new Date(dates.endDate))return alert("Start date must be earlier than end date.");
    onSubmit(dates);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Select Booking Dates</h2>
        <form  className="space-y-4">
          <div>
            <label className="block text-sm">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={dates.startDate}
              onChange={handleChange}
              className="border rounded w-full px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm">End Date</label>
            <input
              type="date"
              name="endDate"
              value={dates.endDate}
              onChange={handleChange}
              className="border rounded w-full px-3 py-2"
              required
            />
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
            onSubmit={()=>handleSubmit}
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DateModal;

