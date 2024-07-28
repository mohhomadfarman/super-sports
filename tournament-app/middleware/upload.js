// middleware/upload.js
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const videoFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("video/")) {
    return cb(new Error("Please upload a video"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: videoFilter,
  limits: { fileSize: 60 * 1024 * 1024 }, // Limit to 1 minute of video
});

module.exports = upload;
