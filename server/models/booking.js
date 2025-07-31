const mongoose = require("mongoose");
const bookingSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    bookingDate: {
      type: Date,
      required: true,
    },
    bookingTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    responseMessage: { type: String },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookingSchema);
module.exports = Book;
