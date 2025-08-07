// const jwt = require("jsonwebtoken");
import jwt from 'jsonwebtoken';

export const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: "1d" });
};

 export const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: "7d" });
};