const User = require("../models/user");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/nodemailer");
const uploadCloudinary = require("../utils/cloudinary");

 
const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password, role, MobileNumber } = req.body;
       
      const user = await User.findOne({ email: email });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      let imageUrl = null;
      if (req?.file?.path) {
          const response = await uploadCloudinary(req.file.path);
          if (response && response.url) {
              imageUrl = response.url; 
          } else {
              return res.status(500).json({ msg: "Image upload failed" });
          }
      } else {
          return res.status(400).json({ msg: "No file uploaded" });
      }

    
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
        MobileNumber,
        img:imageUrl,
      });

      await newUser.save();
      const accesstoken = createAccessToken({ id: newUser._id, role: newUser.role });
      const refreshtoken = createRefreshToken({ id: newUser._id, role: newUser.role });
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });
      return res.json({ accesstoken , message:"User Register Successfully"});
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Server error", error: error.message });
    }
  },

  refreshtoken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;

      if (!rf_token)
        return res.status(400).json({ msg: "Please Login or Register" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN, (err, user) => {
        if (err)
          return res.status(400).json({ msg: "Please Login or Register" });
        const accesstoken = createAccessToken({ id: user.id, role: user.role });
        res.json({ accesstoken });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ msg: "User not found" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(404).json({ msg: "password is invalid" });
      }
      const accesstoken = createAccessToken({ id: user._id, role: user.role });
      const refreshtoken = createRefreshToken({ id: user._id, role: user.role });
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });
      return res.json({ accesstoken, message: "user login successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Server error", error: error.message });
    }
  },

  logout: (req, res) => {
    res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
    return res.json({ msg: "Logged out" });
  },

  getUser: async (req, res) => {
    try {
      if (!req.user || !req.user.id) return res.status(400).json({ msg: "User Not Found" });
  
      const user = await User.findById(req.user.id).select("-password");
      if (!user) return res.status(400).json({ msg: "User Not Found" });
  
      res.json(user);
    }
    catch (err) {
      console.error('Error fetching user:', err);  // Log the error for debugging
      return res.status(500).json({ msg: err.message });
    }
  },

  changepassword: async (req, res) => {
    try {
      const { newpassword } = req.body;
      if (!newpassword)
        return res.status(400).json({ msg: "new password is required" });
      const hash = await bcrypt.hash(newpassword, 10);
      await User.findByIdAndUpdate(req.user._id, { password: hash });
      return res.status(200).json({ msg: "password is updated successfully" });
      await sendEmail(
          req.user.email,
          "Reset Password",
          `Your password has been reset. New Password: ${newpassword}`
        );
       
    } catch (error) {
      return res
        .status(400)
        .json({ msg: "server error", error: error.message });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: "1d" });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: "7d" });
};

module.exports = userCtrl;
