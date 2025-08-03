const SuperAdmin = require("../models/superadmin.model");

const superAdminController = {
     login: async (req, res) => {
        try {
          const { email, password } = req.body;
          const superadmin = await SuperAdmin.findOne({ email: email });
          if (!superadmin) {
            return res.status(400).json({ msg: "superadmin not found" });
          }
          const isMatch = await bcrypt.compare(password, superadmin.password);
          if (!isMatch) {
            return res.status(404).json({ msg: "password is invalid" });
          }
          const accesstoken = createAccessToken({ id: superadmin._id, role: superadmin.role });
          const refreshtoken = createRefreshToken({ id: superadmin._id, role: superadmin.role });
          res.cookie("refreshtoken", refreshtoken, {
            httpOnly: true,
            path: "/superadmin/refresh_token",
          });
          return res.json({ accesstoken, message: "superadmin login successfully" });
        } catch (error) {
          return res
            .status(500)
            .json({ msg: "Server error", error: error.message });
        }
      },
    
      logout: (req, res) => {
        res.clearCookie("refreshtoken", { path: "/superadmin/refresh_token" });
        return res.json({ msg: "Logged out" });
      },
    

}