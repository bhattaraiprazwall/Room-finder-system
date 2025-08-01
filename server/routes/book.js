const express = require("express");
const bookCtrl = require("../controller/bookCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/adminAuth");
const router = express.Router();
router.post("/bookrequest/:roomId", auth, bookCtrl.createBookingRequest);
router.get("/bookings/:bookingId/accept", authAdmin, bookCtrl.RequestAccept)
router.get("/bookings/:bookingId/reject", authAdmin, bookCtrl.RequestRejected)
router.post("/submitform", auth, bookCtrl.submitdataform);
router.get("/booking-requests", auth, bookCtrl.getBookedRoom);

module.exports = router;
