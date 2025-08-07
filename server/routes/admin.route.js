const express = require('express')
const adminController = require('../controller/admin.controller');
const adminRouter = express.Router();
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/adminAuth');

  
adminRouter.post("/login", adminController.login);
adminRouter.get("/info",authAdmin, adminController.getAdmin);
adminRouter.post("/acceptRoom/:roomId",authAdmin,adminController.acceptRoomRequest);
adminRouter.delete("/rejectRoom/:roomId",authAdmin, adminController.rejectRoomRequest);
adminRouter.post("/logout", authAdmin, adminController.logout);

module.exports = adminRouter; 