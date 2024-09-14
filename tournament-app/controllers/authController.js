// controllers/authController.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { jwtSecret } = require("../config");

exports.signup = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};



// exports.login = async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const user = await User.findOne({ username });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(400).send("Invalid credentials");
//     }
//     const token = jwt.sign({ id: user._id,userRole: user.role}, jwtSecret, { expiresIn: '1h' });
//     res.send({ token });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(400).send("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }

    const token = jwt.sign({ id: user._id, userRole: user.role }, jwtSecret, { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    res.status(500).send("Server error");
  }
};


exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send("User not found");
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
    if (!user) return res.status(404).send("User not found");
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};