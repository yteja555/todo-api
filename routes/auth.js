const express = require("express");
const Joi = require("joi");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/user");
const router = express.Router();

// @desc login user
// @route POST /auth
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send("Bad request " + error.details[0].message);

    const { idToken } = req.body;
    const googleClientId = process.env.GOOGLE_CLIENT_ID;
    const client = new OAuth2Client(googleClientId);
    const ticket = client.verifyIdToken({ idToken, audience: googleClientId });
    const payload = (await ticket).getPayload();
    const { name, picture, email } = payload;

    // check if user is already exists
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, picture });
      await user.save();
    }
    const jwtToken = user.getAuthToken();
    res.header("x-auth-token", jwtToken).send({ name, picture });
  } catch (err) {
    res.send(500).send("something went wrong");
  }
});

function validate(loginReq) {
  const schema = {
    idToken: Joi.string().required(),
  };
  return Joi.validate(loginReq, schema);
}
module.exports = router;
