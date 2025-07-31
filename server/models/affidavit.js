const mongoose = require('mongoose');
const Book = require('./booking');
const User = require('./user');
const affidavitSchema = mongoose.Schema({
   
    booking: {
        type:mongoose.Schema.Types.ObjectId ,ref:"Book",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      data: {
        type: Map,
        of: mongoose.Schema.Types.Mixed, 
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
})

const Affidavit = mongoose.model("Affidavit", affidavitSchema)

module.exports = Affidavit;