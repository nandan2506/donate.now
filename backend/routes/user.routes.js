const express = require("express")
const { userRegister, userLogin, allUsers } = require("../controllers/user.controller")
const userRoutes = express.Router()


userRoutes.post("/signUp",userRegister)
userRoutes.post("/login",userLogin)
userRoutes.get("/signUp",allUsers)



module.exports = userRoutes