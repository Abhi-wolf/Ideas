const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Connected to Database ${mongoose.connection.host}`);
  } catch (error) {
    console.log("DB Error : ", error);
  }
};

module.exports = connectDB;
