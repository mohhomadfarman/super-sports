const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("video/") || file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Please upload an image or video"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 60 * 1024 * 1024 }, // Limit to 60 MB
});

module.exports = upload;
