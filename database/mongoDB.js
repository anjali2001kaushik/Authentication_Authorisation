const mongoose = require("mongoose");
const db = process.env.MONGODB_URL;
const serverLogger = require("../utils/logger/serverLogger");
module.exports = mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    serverLogger.appLogger.debug("MongoDB connection Successfull");
    console.log("Connected");
  })
  .catch((error) => {
    serverLogger.appLogger.error("MongoDB connection Failed", error);
    console.log("Failed", error);
  });
