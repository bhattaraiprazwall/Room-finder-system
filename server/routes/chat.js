const express = require('express');
const chatBoat = require('../controller/chatBoat');
const router = express.Router();

router.post("/help", chatBoat.Help)

module.exports = router;