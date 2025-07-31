const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader)
      return res.status(400).json({ msg: "Invalid Authentication" });

    const token = authHeader.split(" ")[1];

    if (!token) return res.status(400).json({ msg: "Invalid Authentication" });

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) return res.status(400).json({ msg: "Invalid Authentication" });

      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = auth;
