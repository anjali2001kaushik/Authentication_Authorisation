const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  password: String,
  isActive: Boolean,
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
