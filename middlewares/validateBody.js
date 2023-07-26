const Joi = require("joi");

const userSchema = Joi.object({
  id: Joi.string().lowercase(),
  name: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(2).lowercase().required(),
  isActive: Joi.boolean().required(),
  roleID: Joi.string().required(),
});

const roleSchema = Joi.object({
  id: Joi.string().lowercase(),
  name: Joi.string().required(),
  permissions: Joi.array().items(Joi.string()),
  isActive: Joi.boolean().required(),
});

const permissionSchema = Joi.object({
  id: Joi.string().lowercase(),
  name: Joi.string().required(),
  description: Joi.string(),
  isActive: Joi.boolean().required(),
});

const getUserByIdSchema = Joi.object({
  id: Joi.string().lowercase().required(),
});

module.exports = {
  userSchema,
  roleSchema,
  permissionSchema,
  getUserByIdSchema,
};
