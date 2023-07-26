const express = require("express");
const RoleModel = require("../models/roleModel");

const getAllRoles = async (req, res) => {
  try {
    const roles = await RoleModel.find({});
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getRoleById = async (req, res) => {
  try {
    const role = await RoleModel.findOne({ _id: req.body.id });
    if (!role) {
      res.status(404).send("Role not found");
    } else {
      res.status(200).json(role);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const getActiveRoles = async (req, res) => {
  try {
    const activeRoles = await RoleModel.find({
      isActive: true,
    });

    if (activeRoles.length === 0) {
      return res.status(200).json({ message: "No active Roles found." });
    }
    res.status(200).json(activeRoles);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getInActiveRoles = async (req, res) => {
  try {
    const activeRoles = await RoleModel.find({
      isActive: false,
    });

    if (activeRoles.length === 0) {
      return res.status(200).json({ message: "No inactive Roles found." });
    }
    res.status(200).json(activeRoles);
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateRolePermissionsById = async (req, res) => {
  try {
    const updateRolePermissions = await RoleModel.findOneAndUpdate(
      { id: req.body.id },
      req.body,
      {
        new: true,
      }
    );
    if (!updateRolePermissions) {
      res.status(404).send("Role not found");
    } else {
      res.status(200).json({ message: "Role updated Successfully." });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteRoleById = async (req, res) => {
  try {
    const deletedUser = await RoleModel.findOneAndDelete({
      id: req.body.id,
    });
    if (!deletedUser) {
      res.status(404).json({ message: "Role not found" });
    } else {
      res.status(200).json({ message: "Role deleted successfully" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getAllRoles,
  getRoleById,
  // getRolesByActivityStatus,
  getInActiveRoles,
  getActiveRoles,
  updateRolePermissionsById,
  deleteRoleById,
};
