const Affidavit = require("../models/affidavit");
const Book = require("../models/booking");
const Room = require("../models/room");
const User = require("../models/user");
const sendEmail = require("../utils/nodemailer");

const bookCtrl = {
  createBookingRequest: async (req, res) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ msg: "User not authenticated" });
      }

      console.log("User details: ", req.user);

      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      const roomId = req.params.roomId;
      const { bookingDate, bookingTime } = req.body;

      if (!roomId || !bookingDate || !bookingTime) {
        return res.status(400).json({ msg: "All fields are required" });
      }

      if (!roomId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ msg: "Invalid room ID" });
      }

      const room = await Room.findById(roomId).populate("owner");

      if (!room) {
        return res.status(404).json({ msg: "Room not found" });
      }

      if (!room.owner || !room.owner.email) {
        return res
          .status(500)
          .json({ msg: "Room owner information is incomplete" });
      }

      console.log(`Owner's email: ${room.owner.email}`);
      console.log(`User's email: ${user.email}`);

      const newBookingRequest = new Book({
        user: req.user.id,
        room: roomId,
        owner: room.owner._id,
        bookingDate,
        bookingTime,
        status: "pending",
      });

      await newBookingRequest.save();
      const bookingId = newBookingRequest._id;

      await sendEmail(
        user.email,
        "your booking request has been sent successfully",
        `
          <h3>your booking request has been sent successfully on ${bookingDate} at ${bookingTime}.</h3>
          <p>Owner Details:</p>
          <p>
            Image: <img src="${room.owner.img}" alt="${room.owner.name}'s image" width="100" height="100" /><br>
            Name: ${room.owner.name}<br>
            Email: ${room.owner.email}<br>
            Phone: ${room.owner.MobileNumber}
            RoomId: ${room.id}
          </p>
        `
      );

      await sendEmail(
        room.owner.email,
        "New Booking Request",
        `
          <h3>You have a new booking request for your room on ${bookingDate} at ${bookingTime}.</h3>
          <p>User Details:</p>
          <p>
            Image: <img src="${user.img}" alt="${user.name}'s image" width="100" height="100" /><br>
            Name: ${user.name}<br>
            Email: ${user.email}<br>
            Phone: ${user.MobileNumber}
          </p>
          <p>Please respond to the booking request:</p>
          <a href="http://localhost:5173/bookings/${bookingId}/accept" 
             style="padding:10px 15px; background-color:green; color:white; text-decoration:none;">Accept</a>
          <a href="http://http://localhost:5173/bookings/${bookingId}/reject" 
             style="padding:10px 15px; background-color:red; color:white; text-decoration:none;">Reject</a>
        `
      );
      console.log(room.owner.email);
      res.status(201).json(newBookingRequest);
    } catch (error) {
      console.error("Error creating booking request:", error.message);
      res.status(500).json({ msg: error.message });
    }
  },

  RequestAccept: async (req, res) => {
    try {
      const { bookingId } = req.params;
      const booking = await Book.findById(bookingId).populate("user");

      if (!booking) {
        return res.status(404).json({ msg: "Booking not found" });
      }

      booking.status = "accepted";
      await booking.save();

      const formLink = `http://localhost:5173/affidavit-form?bookingId=${bookingId}`;

      const emailContent = `
      <p>Your booking has been accepted!</p>
      <p>Please fill out the affidavit form by clicking the link below:</p>
      <p><a href="${formLink}">Fill Out Affidavit Form</a></p>
    `;
      await sendEmail(
        booking.user.email,
        "Booking Accepted - Fill Out the Affidavit Form",
        emailContent
      );

      res.send("Booking accepted and affidavit form email sent");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  },

  RequestRejected: async (req, res) => {
    try {
      const { bookingId } = req.params;

      const booking = await Book.findById(bookingId).populate("user");
      if (!booking) {
        return res.status(404).json({ msg: "Booking not found" });
      }

      booking.status = "rejected";
      await booking.save();
      await sendEmail(
        booking.user.email,
        "Booking Rejected",
        `We regret to inform you that your booking request has been rejected.`
      );

      res.send("Booking rejected and user notified");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  },

  submitdataform: async (req, res) => {
    try {
      const { bookingId, userId, formdata } = req.body;

      if (!formdata || !userId || !bookingId) {
        return res.status(400).json({ msg: "All fields are required" });
      }

      const newAffidavit = new Affidavit({
        booking: bookingId,
        user: userId,
        data: formdata,
      });

      await newAffidavit.save();

      const booking = await Book.findById(bookingId).populate("owner");
      if (!booking) {
        return res.status(404).json({ msg: "Booking not found" });
      }

      try {
        await sendEmail(
          booking.owner.email,
          "New Affidavit Submission",
          `You have a new affidavit submission for your room booking on ${booking.bookingDate} at ${booking.bookingTime}.`
        );
        console.log("Email sent to:", booking.owner.email);
      } catch (emailError) {
        console.error("Error sending email:", emailError.message);
        return res
          .status(500)
          .json({
            msg: "Affidavit submitted, but failed to notify the owner.",
          });
      }

      res.status(200).json({ msg: "Affidavit submitted successfully" });
    } catch (error) {
      console.error("Error submitting affidavit:", error.message);
      res.status(500).json({ error: error.message });
    }
  },
  getBookedRoom: async (req, res) => {
    try {
      const books = await Book.find();
      if (books.length === 0) {
        return res.status(404).json({ msg: "No books found for this owner" });
      }
      res.json(books);
      console.log("books",books);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  getBookedRoomUser: async (req, res) => {
    try {
        // Get user ID from request parameters or authenticated user
        const userId = req.params.userId || req.user._id; // Use params or authenticated user
        
        // Find all bookings for this user and populate related data
        const userBookings = await Book.find({ user: userId })
            .populate('user', 'name email') // Populate user details
            .populate('room', 'title location price') // Populate room details
            .populate('owner', 'name email') // Populate owner details
            .sort({ createdAt: -1 }); // Sort by newest first

        if (userBookings.length === 0) {
            return res.status(404).json({ 
                success: false,
                msg: "No bookings found for this user" 
            });
        }

        // Format the response
        const formattedBookings = userBookings.map(booking => ({
            id: booking._id,
            user: {
                id: booking.user._id,
                name: booking.user.name,
                email: booking.user.email
            },
            room: {
                id: booking.room._id,
                title: booking.room.title,
                location: booking.room.location,
                price: booking.room.price
            },
            owner: {
                id: booking.owner._id,
                name: booking.owner.name,
                email: booking.owner.email
            },
            bookingDate: booking.bookingDate,
            bookingTime: booking.bookingTime,
            status: booking.status,
            createdAt: booking.createdAt
        }));

        res.status(200).json({
            success: true,
            count: formattedBookings.length,
            data: formattedBookings
        });

    } catch (error) {
        console.error("Error fetching user bookings:", error);
        res.status(500).json({ 
            success: false,
            msg: "Server error while fetching bookings",
            error: error.message 
        });
    }
}
};

module.exports = bookCtrl;
