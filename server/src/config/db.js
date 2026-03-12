const mongoose = require("mongoose");
const { DB_NAME } = require("../constants/constant");

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );

    console.log(`✅ MongoDB connected! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("❌ MONGODB CONNECTION Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;