const express = require('express')
const roomCtrl = require('../controller/roomCtrl')
const authAdmin = require('../middleware/adminAuth')
const upload = require('../utils/Multer')
const { getNearbyRooms } = require('../controller/room.controller');
const auth = require('../middleware/auth');
const router = express.Router()

router.post("/create", auth, upload.fields([{ name: 'frontimg', maxCount: 1 }, { name: 'video', maxCount: 1 }]), roomCtrl.createRoom)
router.put("/update/:roomId", auth,upload.fields([{ name: 'frontimg', maxCount: 1 }, { name: 'video', maxCount: 1 }]), roomCtrl.updateRoom)
router.delete("/delete/:roomId",auth, roomCtrl.deleteRoom)
router.get("/infoRoom/:id", roomCtrl.getRoom)
router.get('/admin/allRoom',authAdmin, roomCtrl.getAllRoom);
router.get('/allRoom', roomCtrl.getAllRoomToUser);

router.get('/getRoomByOwner/:ownerId', roomCtrl.getRoomsByOwner)
router.get('/nearby',getNearbyRooms);


module.exports = router     

