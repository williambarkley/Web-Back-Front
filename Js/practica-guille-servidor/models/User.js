const mongoose = require("mongoose");
const validate = require("mongoose-validator");
const { AUTH_ROLES, USER_ROLE } = require("../types");

const nameValidator = [
  validate({
    validator: "isLength",
    arguments: [1, 50],
    message: "Range falied",
  }),
];

const emailValidator = [
  validate({
    validator: "isEmail",
  }),
];
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      validate: nameValidator,
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      valider: emailValidator,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    city: {
      type: String,
    },
    interests: {
      type: [String],
    },
    allowReceiveInfo: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: [...AUTH_ROLES],
      default: USER_ROLE,
    },
    accessToken: {
      type: String,
    },
  },

  {
    timestamp: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("user", UserSchema);
