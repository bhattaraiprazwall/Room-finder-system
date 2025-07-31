const express = require('express')
const userCtrl = require('../controller/userCtrl')
const bookCtrl = require('../controller/bookCtrl')
const auth = require('../middleware/auth')
const upload = require('../utils/Multer')
// const authAdmin = require('../middleware/adminAuth')
const router = express.Router()   


router.post("/register", upload.single("img"), userCtrl.register)   
router.post("/login", userCtrl.login)
router.get('/logout',userCtrl.logout)
router.get('/refresh_token', userCtrl.refreshtoken) 
router.get('/infor',auth,userCtrl.getUser) 
// router.post("/request", auth, bookCtrl.createBookingRequest)
// router.put("/response", authAdmin, bookCtrl.respondToBookingRequest)

module.exports = router     