const mongoose = require('mongoose');
const { roomStatus } = require('../types/roomStatus.typ');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    MobileNumber: { type:String, required: true },
    img :{ type: String, required: true}
    // userStatus:{type:String, enum:roomStatus, default: roomStatus.PENDING}
    
});

const User = mongoose.model('User', userSchema);
module.exports = User;
