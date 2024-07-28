// // middleware/auth.js
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const { jwtSecret } = require('../config');

// const auth = (role) => async (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');
//   if (!token) return res.status(401).send('Access denied');

//   try {
//     const decoded = jwt.verify(token, jwtSecret);
//     const user = await User.findById(decoded.id);
//     if (!user || (role && user.role !== role)) {
//       return res.status(403).send('Access denied');
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(400).send('Invalid token');
//   }
// };

// module.exports = auth;


// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { jwtSecret } = require("../config");

const auth = () => async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).send("Access denied");

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(403).send("Access denied");
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

module.exports = auth;
