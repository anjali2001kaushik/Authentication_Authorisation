const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email }).populate("role");

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const hashedPassword = user.password;
    const isMatch = await comparePasswords(password, hashedPassword);

    if (isMatch) {
      const secretKey = process.env.JWT_SECRET;
      const token = jwt.sign(
        {
          id: user._id,
          username: user.name,
          email: user.email,
          role: user.role.name,
        },
        secretKey,
        {
          expiresIn: "1h",
        }
      );
      // res.setHeader("Authorization", token);
      res.cookie("sessionToken", token);
      return res
        .status(200)
        .json({ name: user.name, email: user.email, role: user.role.name });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const comparePasswords = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error(error);
    throw new Error("Password comparison error");
  }
};

module.exports = loginController;
