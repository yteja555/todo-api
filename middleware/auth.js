const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Token required");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded._id;
    console.log("decoded is ", decoded);
    next();
  } catch (err) {
    res.status(400).send("bad request invalid token");
  }
};
