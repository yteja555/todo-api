const express = require("express");
const bcryptjs = require("bcryptjs");
const { User, validateUser } = require("../models/user");
const router = express.Router();

// @desc register user
// @route POST /users
router.post("/", async (req, res) => {
  // check for errors in users request
  const { error } = validateUser(req.body);
  if (error)
    return res.status(400).send("Bad request " + error.details[0].message);

  const { name, email, password } = req.body;

  // check if user is already registered
  let user = await User.findOne({ email });
  if (user) return res.status(400).send("user is already registered");

  const pass = await bcryptjs.hash(password, 10);
  user = new User({ name, email, password: pass });
  await user.save();
  const jwtToken = user.getAuthToken();
  res.header("x-auth-token", jwtToken).send({ name, email });
});

module.exports = router;
