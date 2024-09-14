const express = require("express");
const { updateUserProfile, getUserProfile,updatePassword } = require("../controllers/UserController");
const upload = require("../middleware/upload"); // Your multer setup
const auth = require("../middleware/auth");   

const router = express.Router();

// Route for updating user profile including profile photo
router.put("/update-profile/:id", upload.single("profilePhoto"), updateUserProfile);

router.get("/get-profile/:id", auth(), getUserProfile);

router.put("/change-password/:id",auth(), updatePassword);
 
module.exports = router;
