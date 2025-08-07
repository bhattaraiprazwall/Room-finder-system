const mongoose = require('mongoose');
const { roomStatus } = require('../types/roomStatus.typ');

const roomSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
      default: "Point"
    },
    coordinates: {
      type: [Number], // Format: [longitude, latitude]
      required: true
    },
    address: {
      type: String,
      required: true
    }
  },

  price: {
    type: Number,
    required: true
  },

  amenities: [String],

  additionalInformation: {
    type: String,
    required: false
  },

  frontimg: {
    type: String,
    required: true
  },

  video: {
    type: String,
    required: [true, 'Video URL is required']
  },

  available: {
    type: Boolean,
    default: false
  },
  roomStatus: {
    type: String,
    enum: Object.values(roomStatus),
    default: roomStatus.PENDING
  }
});

// ✅ Create a 2dsphere index on location for geospatial queries
roomSchema.index({ location: "2dsphere" });

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
