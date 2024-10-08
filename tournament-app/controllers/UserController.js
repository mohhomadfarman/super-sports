// controllers/userController.js
const User = require("../models/User");

// Update user profile details including profile photo
const updateUserProfile = async (req, res) => {
  try {
    const { email, phone, address, firstName, lastName, streetAddress1, streetAddress2, city, province, barangay,dob,age,gender} = req.body;
    const userId = req.params.id;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update only the fields provided in the request
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (streetAddress1) user.address.streetAddress1 = streetAddress1;
    if (streetAddress2) user.address.streetAddress2 = streetAddress2;
    if (city) user.address.city = city;
    if (barangay) user.address.barangay = barangay;
    if (province) user.address.province = province;
    if (dob) user.dob = dob;
    if (age) user.age = age;
    if (gender) user.gender = gender;

    // Update the profile photo if file is uploaded
    if (req.file) {
      user.profilePhoto = req.file.path; // Save the file path to profilePhoto
    }

    // Save the updated user data
    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        email: user.email,
        phone: user.phone,
        profilePhoto: user.profilePhoto,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        dob: user.dob,
        age: user.age,
        gender: user.gender,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};

const getUserProfile = async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Find user by ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Send the user profile data (excluding password)
      res.status(200).json({
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          phone: user.phone,
          address: user.address,
          profilePhoto: user.profilePhoto,
          dob: user.dob,
          age: user.age,
          gender: user.gender
        },
      });
    } catch (error) {
      res.status(500).json({ message: "An error occurred", error: error.message });
    }
  };


  async function updatePassword(req, res) {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;
  
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      await user.changePassword(oldPassword, newPassword);
  
      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  


module.exports = { updateUserProfile ,getUserProfile ,updatePassword };
