const UserModel = require("../models/userModel");
const PermissionModel = require("../models/permissionModel");
const RoleModel = require("../models/roleModel");

const checkPermissions = async (req, res, next) => {
  console.log("check called");
  const string = req.route.path;

  const match = string.match(/\/([^/]+)/);
  const value = match ? match[1] : string.slice(1, -1);
  const user = req.user;

  try {
    const rolePermissions = await RoleModel.findOne({
      name: user.role,
    }).populate("permissions");

    if (!rolePermissions.isActive) {
      return res.status(403).json({
        message: "Your Role is Inactive, contact your Administrator",
      });
    }

    // if (!userPermissions.permissions.includes(requestedPermission)) {
    //   return res
    //     .status(403)
    //     .json({ message: "You are not allowed to perform this action" });
    // }
    // next();

    const isAllowed = rolePermissions.permissions.some((permission) => {
      return permission.name === value.toUpperCase() && permission.isActive;
    });
    if (isAllowed) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "You are not allowed to perform this action" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving permissions" });
  }
};

module.exports = checkPermissions;
