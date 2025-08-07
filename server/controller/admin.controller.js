const Admin = require("../models/admin.model");
const jwt = require("jsonwebtoken");
const { createAccessToken, createRefreshToken } = require("../utils/generateToken");
const Room = require("../models/room");
const roomStatus = require("../types/roomStatus.typ")

const adminController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log("admin login", req.body);
      const admin = await Admin.findOne({ email: email });
      if (!admin) {
        return res.status(400).json({ msg: "superadmin not found" });
      }

      // ...existing code...
      if (password !== admin.password) {
        return res.status(401).json({ msg: "Password is invalid" });
      }
      // ...existing code...
      console.log("pass eerror", password, admin.password);
      const accesstoken = createAccessToken({ id: admin._id, role: admin.role });
      const refreshtoken = createRefreshToken({ id: admin._id, role: admin.role });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/admin/refresh_token",
      });
      return res.json({ accesstoken, message: "admin login successfully" });
    } catch (error) {
      console.log("admin login errro:", error.message);
      return res
        .status(500)
        .json({ msg: "Server error", error: error.message });

    }
  },

  logout: (req, res) => {
    res.clearCookie("refreshtoken", { path: "/admin/refresh_token" });
    return res.json({ msg: "Logged out" });
  },

  getAdmin: async (req, res) => {
    try {
      if (!req.user) return res.status(400).json({ msg: "User Not Found" });
      console.log("user request", req.user);
      const admin = await Admin.findById(req.user.id).select("-password");
      if (!admin) return res.status(400).json({ msg: "User Not Found" });
      console.log("Admin info:", admin);
      res.json(admin);
    }
    catch (err) {
      console.error('Error fetching user:', err);  // Log the error for debugging
      return res.status(500).json({ msg: err.message });
    }
  },

  acceptRoomRequest: async (req, res) => {
    try {
      const { roomId } = req.params;
      console.log("reject id:", roomId);
      const acceptRequest = await Room.findById({ _id: roomId });


      if (!acceptRequest) {
        return res.status(404).json({ msg: "acceptRequest not found" });
      }

    acceptRequest.roomStatus = roomStatus.roomStatus.ENABLE;
    acceptRequest.available = true; 
      await acceptRequest.save();

      //   // const formLink = `http://localhost:5173/affidavit-form?roomId=${roomId}`;

      //   const emailContent = `
      //   <p>Your booking has been accepted!</p>
      //   <p>Please fill out the affidavit form by clicking the link below:</p>

      // `;
      //   await sendEmail(
      //     booking.user.email,
      //     "Booking Accepted - Fill Out the Affidavit Form",
      //     emailContent
      //   );

      res.send("Booking accepted and affidavit form email sent");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  },

  rejectRoomRequest: async (req, res) => {
    try {
      const { roomId } = req.params;
      console.log("reject id:", roomId);
      const reject = await Room.findById({ _id: roomId });
      if (!reject) {
        return res.status(404).json({ msg: "reject not found" });
      }

    const deleteRoom = await Room.deleteOne({ _id: roomId });
      // await sendEmail(
      //   booking.user.email,
      //   "Booking Rejected",
      //   `We regret to inform you that your booking request has been rejected.`
      // );

      res.send("Booking rejected and user notified");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }

}
module.exports = adminController;
