// import Room from '../models/room.js';
// import asyncHandler from '../utils/asyncHandler.js';
// import CustomError from '../utils/customError.util.js';

// // Get Nearby Rooms
// export const getNearbyRooms = asyncHandler(async (req, res, next) => {
//   const { lat, lng, radius } = req.query;
//   console.log("nearby data:", req.query);

//   if (!lat || !lng || !radius) {
//     return next(new CustomError("Latitude, longitude and radius are required", 400));
//   }

//   const latitude = parseFloat(lat);
//   const longitude = parseFloat(lng);
//   const distanceInKm = parseFloat(radius);

//   if (isNaN(latitude) || isNaN(longitude) || isNaN(distanceInKm)) {
//     return next(new CustomError("Invalid latitude, longitude, or radius", 400));
//   }

//   const radiusInMeters = distanceInKm * 1000;

//  try {
//   const nearbyRooms = await Room.find({
//     location: {
//       $geoWithin: {
//         $centerSphere: [[longitude, latitude], radiusInRadians],
//       },
//     },
//     available: true,
//   });

//   res.status(200).json({
//     status: 'success',
//     success: true,
//     count: nearbyRooms.length,
//     data: nearbyRooms,
//   });
// } catch (err) {
//   console.error("Geo query error:", err);
//   return next(new CustomError("Failed to find nearby rooms", 500));
// }

// });


//working code..................

// import Room from '../models/room.js';
// import asyncHandler from '../utils/asyncHandler.js';
// import CustomError from '../utils/customError.util.js';
// import algo from "../utils/haversine.js"
// // Get Nearby Rooms
// export const getNearbyRooms = asyncHandler(async (req, res, next) => {
//   const { lat, lng, radius } = req.query;
//   console.log("nearby data:", req.query);

//   if (!lat || !lng || !radius) {
//     return next(new CustomError("Latitude, longitude and radius are required", 400));
//   }

//   const latitude = parseFloat(lat);
//   const longitude = parseFloat(lng);
//   const distanceInKm = parseFloat(radius);

//   if (isNaN(latitude) || isNaN(longitude) || isNaN(distanceInKm)) {
//     return next(new CustomError("Invalid latitude, longitude, or radius", 400));
//   }

//   // Correct radius in radians
//   const radiusInRadians = distanceInKm / 6371;

//   try {
//     const nearbyRooms = await Room.find({
//       location: {
//         $geoWithin: {
//           $centerSphere: [[longitude, latitude], radiusInRadians],
//         },
//       },
//       available: true,
//     });

//     res.status(200).json({
//       status: 'success',
//       success: true,
//       count: nearbyRooms.length,
//       data: nearbyRooms,
//     });
//   } catch (err) {
//     console.error("Geo query error:", err);
//     return next(new CustomError("Failed to find nearby rooms", 500));
//   }
// });


//testing code 
import Room from '../models/room.js';
import asyncHandler from '../utils/asyncHandler.js';
import CustomError from '../utils/customError.util.js';
import haversineDistance from "../utils/haversine.js";

// Get Nearby Rooms using haversine algorithm
export const getNearbyRooms = asyncHandler(async (req, res, next) => {
  const { lat, lng, radius } = req.query;
  console.log("nearby data:", req.query);

  if (!lat || !lng || !radius) {
    return next(new CustomError("Latitude, longitude and radius are required", 400));
  }

  const latitude = parseFloat(lat);
  const longitude = parseFloat(lng);
  const distanceInKm = parseFloat(radius);

  if (isNaN(latitude) || isNaN(longitude) || isNaN(distanceInKm)) {
    return next(new CustomError("Invalid latitude, longitude, or radius", 400));
  }

  try {
    // Step 1: Get all available rooms
    const allRooms = await Room.find({ available: true });

    // Step 2: Filter rooms within radius using haversineDistance
    const nearbyRooms = allRooms.filter(room => {
      const roomLat = room.location.coordinates[1]; // [lng, lat]
      const roomLng = room.location.coordinates[0];

      const distance = haversineDistance(latitude, longitude, roomLat, roomLng);
      return distance <= distanceInKm;
    });

    res.status(200).json({
      status: 'success',
      success: true,
      count: nearbyRooms.length,
      data: nearbyRooms,
    });
  } catch (err) {
    console.error("Haversine query error:", err);
    return next(new CustomError("Failed to find nearby rooms", 500));
  }
});
