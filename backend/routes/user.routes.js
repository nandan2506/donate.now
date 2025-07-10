const express = require("express");
const {
  userRegister,
  userLogin,
  allUsers,
  userProfile,
  updateProfile,
  checkPassword,
  forgetPassword,
  setNewPassword,
  verifyOtp,
} = require("../controllers/user.controller");


const {auth} = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/admin.middleware");
const userRoutes = express.Router();

userRoutes.post("/signUp", userRegister)
userRoutes.post("/login", userLogin)
userRoutes.get("/allUsers",auth, isAdmin, allUsers)
userRoutes.get("/userProfile/:userId", auth, userProfile)
userRoutes.put("/updateProfile/:userId", auth, updateProfile)
userRoutes.put("/verify-otp", verifyOtp)
userRoutes.post("/forgetPassword", forgetPassword)
userRoutes.post("/checkPassword",auth, checkPassword)
userRoutes.post("/setNewPassword", setNewPassword)


module.exports = userRoutes;
