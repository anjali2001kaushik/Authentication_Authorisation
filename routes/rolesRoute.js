const express = require("express");
const rolesRouter = express.Router();
const {
  getAllRoles,
  getRoleById,
  updateRolePermissionsById,
  getActiveRoles,
  getInActiveRoles,
  deleteRoleById,
} = require("../controllers/roleController");
const authMiddleware = require("../middlewares/authMiddleware");
const checkPermissionsMiddleware = require("../middlewares/checkPermissionsMiddleware");

rolesRouter.get(
  "/all-roles",
  authMiddleware,
  checkPermissionsMiddleware,
  getAllRoles
);
rolesRouter.get(
  "/get-role",
  authMiddleware,
  checkPermissionsMiddleware,
  getRoleById
);
rolesRouter.get(
  "/active-roles",
  authMiddleware,
  checkPermissionsMiddleware,
  getActiveRoles
);
rolesRouter.get(
  "/inactive-roles",
  authMiddleware,
  checkPermissionsMiddleware,
  getInActiveRoles
);
rolesRouter.put(
  "/update-role",
  authMiddleware,
  checkPermissionsMiddleware,
  updateRolePermissionsById
);
rolesRouter.delete(
  "/delete-role",
  authMiddleware,
  checkPermissionsMiddleware,
  deleteRoleById
);

module.exports = rolesRouter;
