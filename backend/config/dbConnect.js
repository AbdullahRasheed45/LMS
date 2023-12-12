const mongoose = require("mongoose");

const dbConnect = () => {
  try {
    const connection = mongoose.connect(process.env.MONGODB_URI);
    console.log("DB connected successfully");
  } catch (err) {
    console.log(err);
  }
};

module.exports = dbConnect;
