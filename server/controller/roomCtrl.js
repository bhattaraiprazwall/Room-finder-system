const Room = require("../models/room");
const uploadCloudinary = require("../utils/cloudinary");

const roomCtrl = {
  createRoom: async (req, res) => {
    console.log(req.files);
    console.log("Room created..");

    const {
      owner,
      location,
      price,
      amenities = "",
      available,
      additionalInformation,
    } = req.body;

    try {
      
      let frontimageUrl = null;
      if (req.files && req.files["frontimg"] && req.files["frontimg"][0]?.path) {
        const response = await uploadCloudinary(req.files["frontimg"][0].path);
        if (response && response.url) {
          frontimageUrl = response.url;
        } else {
          return res.status(500).json({ msg: "Image upload failed" });
        }
      } else {
        console.log("No front image file uploaded");
        return res.status(400).json({ msg: "No front image file uploaded" });
      }

     
let videoUrl = null;
if (req.files && req.files["video"] && req.files["video"][0]?.path) {
  const videoResponse = await uploadCloudinary(req.files["video"][0].path);
  if (videoResponse && videoResponse.url) {
    videoUrl = videoResponse.url;
  } else {
    return res.status(500).json({ msg: "Video upload failed" });
  }
} else {
  console.log("No video file uploaded");
  
  return res.status(400).json({ msg: "No video file uploaded" });
}

      const newRoom = new Room({
        owner,
        location,
        price,
        amenities,
        available,
        additionalInformation,
        frontimg: frontimageUrl,
        video: videoUrl, 
      });
      await newRoom.save();
      console.log("Room created..");
      return res.status(201).json({ message: "Room created successfully", room: newRoom });
    } catch (error) {
      return res.status(500).json({ message: "Error creating room", error: error.message });
    }
  },
  updateRoom: async (req, res) => {
    const {
      owner,
      location,
      price,
      amenities,
      additionalInformation,
    } = req.body;
    const roomId = req.params.id;

    console.log(`Updating room with ID: ${roomId}`);
    console.log(`Update details: ${JSON.stringify(req.body)}`);

    // let frontimageUrl = null;
    // if (req.files && req.files["frontimg"] && req.files["frontimg"][0].path) {
    //   const response = await uploadCloudinary(
    //     req.files && req.files["frontimg"] && req.files["frontimg"][0].path
    //   );
    //   if (response && response.url) {
    //     frontimageUrl = response.url;
    //   } else {
    //     return res.status(500).json({ msg: "Image upload failed" });
    //   }
    // }

    // if (req.files && req.files["video"] && req.files["video"][0].path) {
    //   const videoResponse = await uploadCloudinary(req.files["video"][0].path);
    //   if (videoResponse && videoResponse.url) {
    //     videoUrl = videoResponse.url;
    //   } else {
    //     return res.status(500).json({ msg: "Video upload failed" });
    //   }
    // } else {
    //   console.log("No video file uploaded");
    //   return res.status(400).json({ msg: "No video file uploaded" });
    // }

    try {
      const updatedRoom = await Room.findOneAndUpdate(
        { _id: roomId },
        {
          owner,
          location,
          price,
          amenities,
          available,
          additionalInformation,
          // frontimg: frontimageUrl || undefined,
          // video: videoUrl || undefined,
        },
        { new: true }
      );

      if (!updatedRoom) {
        console.log(`Room with ID: ${roomId} not found.`);
        return res.status(404).json({ msg: "Room not found" });
      }

      console.log(`Room updated: ${JSON.stringify(updatedRoom)}`);
      res.json({ msg: "Room updated successfully", updatedRoom });
    } catch (error) {
      console.error(`Error updating room: ${error.message}`);
      res.status(400).json({ msg: error.message });
    }
  },
  deleteRoom: async (req, res) => {
    try {
      await Room.findOneAndDelete(req.params.id);
      res.json({ msg: "Deleted a Product" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  getRoom: async (req, res) => {
    try {
            const roomId = req.params.id;
      const room = await Room.findById(roomId);
      if (!room) {
        return res.status(404).json({ msg: "Room not found" });
      }
      res.json(room);
      
    } catch (error) {
      console.error(`Error fetching room with ID ${req.params.id}:`, error);
      res.status(500).json({ msg: error.message });
    }       
  },  

   getRoomsByOwner: async (req, res) => {
    const ownerId = req.params.ownerId;
    try {
      const rooms = await Room.find({ owner: ownerId });
      if (rooms.length === 0) {
        return res.status(404).json({ msg: "No rooms found" });
      }
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },    

  getAllRoom: async (req, res) => {
    // const ownerId = req.params.ownerId;
    try {
      const rooms = await Room.find();
      if (rooms.length === 0) {
        return res.status(404).json({ msg: "No rooms found for this owner" });
      }
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = roomCtrl;
