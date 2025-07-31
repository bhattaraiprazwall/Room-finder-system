const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const uploadCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

  
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File uploaded successfully to Cloudinary:", response.url);

  
    fs.unlinkSync(localFilePath);
    console.log("Local file deleted:", localFilePath);

    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
      console.log("Local file deleted after error:", localFilePath);
    }

    throw new Error("File upload to Cloudinary failed");
  }
};

module.exports = uploadCloudinary