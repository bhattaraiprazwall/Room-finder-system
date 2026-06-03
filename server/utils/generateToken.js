const jwt = require("jsonwebtoken");

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: "1d" });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: "7d" });
};

module.exports = { createAccessToken, createRefreshToken };