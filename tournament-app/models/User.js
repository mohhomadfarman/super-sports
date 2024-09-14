// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String  }, 
  phone: { type: String },  
  address: { type: String },                            
  profilePhoto: { type: String },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
// password change function 
userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) {
    throw new Error("Password is not set for this user.");
  }
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.changePassword = async function (oldPassword, newPassword) {
  if (!oldPassword || !newPassword) {
    throw new Error("Both old and new passwords must be provided.");
  }

  const isMatch = await this.comparePassword(oldPassword);
  if (!isMatch) {
    throw new Error("Incorrect current password.");
  }
  this.password = newPassword;

  await this.save();

  console.log("Password updated successfully!");
  return true;
};


module.exports = mongoose.model("User", userSchema);
