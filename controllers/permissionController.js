const express = require("express");
const PermissionModel = require("../models/permissionModel");

const getAllPermissions = async (req, res) => {
  try {
    const permission = await PermissionModel.find({});
    res.status(200).json(permission);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getActivePermissions = async (req, res) => {
  try {
    const activePermissions = await PermissionModel.find({
      isActive: true,
    });
    if (activePermissions.length === 0) {
      return res.status(200).json({ message: "No active permissions found." });
    }
    res.status(200).json(activePermissions);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getInActivePermissions = async (req, res) => {
  try {
    const InActivePermissions = await PermissionModel.find({
      isActive: false,
    });
    if (InActivePermissions.length === 0) {
      return res
        .status(200)
        .json({ message: "No inactive permissions found." });
    }
    res.status(200).json(InActivePermissions);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getPermissionsById = async (req, res) => {
  try {
    const permission = await PermissionModel.findOne({
      _id: req.params.id,
    });
    if (!permission) {
      res.status(404).json({ message: "Permission not found" });
    } else {
      res.status(200).json(permission);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const updatePermissionsById = async (req, res) => {
  try {
    const updatePermission = await PermissionModel.findOneAndUpdate(
      { id: req.body.id },
      req.body,
      { new: true }
    );

    if (!updatePermission) {
      return res.status(404).json({ message: "Permission not found" });
    }

    res.status(200).json({ message: "Permission updated Successfully" });
  } catch (err) {
    res.status(500).send(err);
  }
};

const deletePermissionById = async (req, res) => {
  try {
    const deletedPermission = await PermissionModel.findOneAndDelete({
      id: req.params.id,
    });

    if (!deletedPermission) {
      return res.status(404).json({ message: "Permission not found" });
    }

    res.status(200).send("Permission deleted successfully");
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getAllPermissions,
  getActivePermissions,
  getInActivePermissions,
  getPermissionsById,
  updatePermissionsById,
  deletePermissionById,
};
