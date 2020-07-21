const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

// mongoose schema for user
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 30,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
});
// adding method to generate jsonwebtoken to User object
UserSchema.methods.getAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY);
};

// creating user model
const User = mongoose.model("users", UserSchema);

// joi validator for user
function validateUser(user) {
  const UserSchema = {
    name: Joi.string().min(4).max(20).required(),
    email: Joi.string().email().required().min(5).max(30),
    password: Joi.string().min(5).max(250).required(),
  };
  return Joi.validate(user, UserSchema);
}

exports.validateUser = validateUser;
exports.User = User;
