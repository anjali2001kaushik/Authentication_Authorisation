const { default: mongoose } = require("mongoose");
const UserModel = require("../models/userModel");
const RoleModel = require("../models/roleModel"); // Import the RoleModel
const { v4: uuidv4 } = require("uuid");

const registerController = async (req, res) => {
  const { username, email, password, isActive, role } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newRole = await RoleModel.findOne({ name: role });

    if (!newRole) {
      return res.status(404).json({ message: "Role not found" });
    }

    const newUser = await UserModel.create({
      id: uuidv4(),
      name: username,
      email: email,
      password: password,
      isActive: isActive,
      roles: newRole._id,
    });

    return res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = registerController;
