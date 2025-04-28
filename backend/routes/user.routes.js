const express = require("express")
const { userRegister, userLogin, allUsers, userProfile, updateProfile } = require("../controllers/user.controller")
const auth = require("../middlewares/auth.middleware")
const userRoutes = express.Router()


userRoutes.post("/signUp",userRegister)
userRoutes.post("/login",userLogin)
userRoutes.get("/signUp",allUsers)
userRoutes.get("/userProfile",auth,userProfile)
userRoutes.put("/updateProfile",auth,updateProfile)



module.exports = userRoutes