const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "upload"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname); 
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});


const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "video/mp4", "video/mkv"];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images and videos are allowed."), false);
  }
};


const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
