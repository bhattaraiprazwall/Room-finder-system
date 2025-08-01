const express = require("express");
const bookCtrl = require("../controller/bookCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/adminAuth");
const router = express.Router();
router.post("/bookrequest/:roomId", auth, bookCtrl.createBookingRequest);
router.get("/bookings/:bookingId/accept", bookCtrl.RequestAccept)
router.get("/bookings/:bookingId/reject", bookCtrl.RequestRejected)
router.post("/submitform", auth, bookCtrl.submitdataform);
router.get("/booking-requests", bookCtrl.getBookedRoom);
// router.get("/booking-requests", (req, res) => {
//   console.log("✅ Backend route hit");
//   res.json({ message: "Booking route working" });
// });


module.exports = router;
