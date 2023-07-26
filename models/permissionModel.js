const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: String,
  isActive: { type: Boolean, required: true },
});

const permissionModel = mongoose.model("Permission", permissionSchema);

module.exports = permissionModel;
