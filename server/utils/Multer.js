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
  // Allow all common image and video MIME types
  const allowedMimeTypes = [
    // Images
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/bmp",
    "image/tiff",
    // Videos
    "video/mp4",
    "video/mkv",
    "video/quicktime",
    "video/x-msvideo",
    "video/x-matroska",
    "video/webm",
    "video/mpeg",
  ];
  
  // Validate by MIME type
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
    return;
  }
  
  // Fallback: validate by file extension if MIME type not recognized
  const allowedExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".webp",
    ".bmp",
    ".tiff",
    ".mp4",
    ".mkv",
    ".mov",
    ".avi",
    ".webm",
    ".mpeg",
    ".mpg",
  ];
  
  const fileExt = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(fileExt)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images (JPG, PNG, GIF, WebP, BMP, TIFF) and videos (MP4, MKV, MOV, AVI, WebM, MPEG) are allowed."), false);
  }
};


const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
