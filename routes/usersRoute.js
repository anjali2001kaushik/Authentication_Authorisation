const express = require("express");
const userRouter = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUserByIdOrEmail,
  deleteUserById,
} = require("../controllers/userController");

const loginController = require("../controllers/loginController");
const logoutController = require("../controllers/logoutController");
const checkPermissionsMiddleware = require("../middlewares/checkPermissionsMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const checkLoginStatus = require("../middlewares/checkLogin");


userRouter.get("/check-login", checkLoginStatus);
userRouter.post("/login", loginController);
userRouter.post("/logout", logoutController);
userRouter.post(
  "/create-user",
  authMiddleware,
  checkPermissionsMiddleware,
  createUser
);
userRouter.get(
  "/all-users",
  authMiddleware,
  checkPermissionsMiddleware,
  getAllUsers
);
userRouter.get(
  "/get-user",
  authMiddleware,
  checkPermissionsMiddleware,
  getUserById
);
userRouter.put(
  "/update-user",
  authMiddleware,
  checkPermissionsMiddleware,
  updateUserByIdOrEmail
);
userRouter.delete(
  "/delete-user/:id",
  authMiddleware,
  checkPermissionsMiddleware,
  deleteUserById
);

module.exports = userRouter;
