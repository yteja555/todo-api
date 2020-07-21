const express = require("express");
const bcryptjs = require("bcryptjs");
const Joi = require("joi");
const { User } = require("../models/user");
const router = express.Router();

// @desc login user
// @route POST /auth
router.post("/", async (req, res) => {
  // check for errors in users request
  const { error } = validate(req.body);
  if (error)
    return res.status(400).send("Bad request " + error.details[0].message);

  const { email, password } = req.body;

  // check if user is already registered
  let user = await User.findOne({ email });
  if (!user) return res.status(400).send("Invalid credentials");

  const validPass = await bcryptjs.compare(password, user.password);
  if (!validPass) return res.status(400).send("Invalid credentials");

  const jwtToken = user.getAuthToken();
  res.send(jwtToken);
});

function validate(loginReq) {
  const schema = {
    email: Joi.string().email().required().min(5).max(50),
    password: Joi.string().required().min(5).max(250),
  };
  return Joi.validate(loginReq, schema);
}
module.exports = router;
