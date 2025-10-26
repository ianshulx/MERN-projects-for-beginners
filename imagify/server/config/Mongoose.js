const mongoose = require("mongoose");

const ConnectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("connected to DB");
  });
  await mongoose.connect(`${process.env.MONGO_URI}/imagify`);
};

module.exports = ConnectDB;