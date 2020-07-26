const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

// mongoose schema for user
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
});
// adding method to generate jsonwebtoken to User object
UserSchema.methods.getAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY);
};

// creating user model
const User = mongoose.model("users", UserSchema);

module.exports = User;
