const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  id: String,
  name: String,
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }],
  isActive: Boolean,
});

const roleModel = mongoose.model("Role", roleSchema);

module.exports = roleModel;
