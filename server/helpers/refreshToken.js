const jwt = require("jsonwebtoken");

const generateRefreshToken = (user) =>
  jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "15m" });

module.exports = { generateRefreshToken };