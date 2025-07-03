const express = require("express");
const {
  userRegister,
  userLogin,
  allUsers,
  userProfile,
  updateProfile,
  // verifyEmail,
  checkPassword,
  forgetPassword,
  setNewPassword,
} = require("../controllers/user.controller");


const {auth} = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/admin.middleware");
const userRoutes = express.Router();

userRoutes.post("/signUp", userRegister)
userRoutes.post("/login", userLogin)
userRoutes.get("/allUsers",auth, isAdmin, allUsers)
userRoutes.get("/userProfile/:userId", auth, userProfile)
userRoutes.put("/updateProfile/:userId", auth, updateProfile)
// userRoutes.get("/verify-email",auth, verifyEmail)
userRoutes.post("/forgetPassword",auth, forgetPassword)
userRoutes.post("/checkPassword",auth, checkPassword)
userRoutes.post("/resetPassword",auth, setNewPassword)


module.exports = userRoutes;
