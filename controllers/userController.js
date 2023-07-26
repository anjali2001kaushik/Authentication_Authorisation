const bcrypt = require("bcryptjs");
const SendEmail = require("./sendEmailController");
const UserModel = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");

const {
  userSchema,
  getUserByIdSchema,
} = require("../middlewares/validateBody");

const createUser = async (req, res) => {
  console.log("create called", req.body);
  try {
    const validatedData = await userSchema.validateAsync(req.body);

    const existingUser = await UserModel.findOne({
      email: validatedData.email,
    });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: `${validatedData.email} already exists` });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(validatedData.password, salt);

    const newUser = await UserModel.create({
      id: uuidv4(),
      name: validatedData.name,
      email: validatedData.email,
      password: hashedPassword,
      isActive: validatedData.isActive,
      role: validatedData.roleID,
    });

    await SendEmail(req, res);

    return res.status(201).json({
      message: `User successfully registered with ${validatedData.email}`,
    });
  } catch (error) {
    if (error.isJoi) {
      console.log(error);
      return res.status(422).json({ message: "Please check the input data" });
    }
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getUserById = async (req, res) => {
  try {
    if (!req.body?.id) {
      return res.status(400).json({ message: "No ID found." });
    }

    const validatedData = await getUserByIdSchema.validateAsync(req.body);
    if (validatedData.id.length !== 36) {
      return res.status(422).json({ message: "ID must be 36 characters." });
    }

    const user = await UserModel.findOne({ id: validatedData.id });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred." });
  }
};

const updateUserByIdOrEmail = async (req, res) => {
  try {
    const filter = {
      $or: [{ id: req.body.id }, { email: req.body.email }],
    };
    const updatedUser = await UserModel.findOneAndUpdate(filter, req.body, {
      new: true,
    });
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "User Successfully Updated" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await UserModel.findOneAndDelete({
      id: req.params.id,
    });
    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserByIdOrEmail,
  deleteUserById,
};
