const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  id: String,
  startDate: Date,
  endDate: Date,
  ipAddress: String,
  userAgent: String,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const sessionModel = mongoose.model("Session", sessionSchema);

export default sessionModel;
