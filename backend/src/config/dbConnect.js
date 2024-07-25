require('dotenv').config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

module.exports = { dbConnect };
