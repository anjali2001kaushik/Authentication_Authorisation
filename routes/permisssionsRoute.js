const express = require("express");
const permissionRouter = express.Router();
const {
  getAllPermissions,
  getActivePermissions,
  getInActivePermissions,
  getPermissionsById,
  updatePermissionsById,
  deletePermissionById,
} = require("../controllers/permissionController.js");
const authMiddleware = require("../middlewares/authMiddleware");
const checkPermissionsMiddleware = require("../middlewares/checkPermissionsMiddleware");


permissionRouter.get("/all-permissions", authMiddleware, checkPermissionsMiddleware, getAllPermissions);
permissionRouter.get("/active-permissions", authMiddleware, checkPermissionsMiddleware, getActivePermissions);
permissionRouter.get("/inactive-permissions", authMiddleware, checkPermissionsMiddleware, getInActivePermissions);
permissionRouter.get("/get-permission/:id",  authMiddleware, checkPermissionsMiddleware, getPermissionsById);
permissionRouter.put("/update-permission", authMiddleware, checkPermissionsMiddleware, updatePermissionsById);
permissionRouter.delete("/delete-permission/:id", authMiddleware, checkPermissionsMiddleware, deletePermissionById);

module.exports = permissionRouter;
