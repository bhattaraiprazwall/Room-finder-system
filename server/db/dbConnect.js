const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.DB_URL;

const dbConnection = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
  }
};

module.exports = dbConnection;
