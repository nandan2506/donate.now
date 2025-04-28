const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")
const nodemailer = require("nodemailer")



const allUsers = async (req, res) => {
    try {
        const users = await userModel.find()
        if (!users.length) {
            return res.status(200).json({ message: "No users found", data: [] })
        }

        res.status(200).json({ message: "Users retrieved successfully", data: users })
    } catch (error) {
        console.log("error while fetching users", error)
        res.status(404).json("error while fetching users")
    }
}



const userRegister = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const userExist = await userModel.findOne({ email })
        if (userExist) {
            return res.status(400).json({ message: "user already exist, please login" })
        }
        const hash = bcrypt.hashSync(password, 10)
        await userModel.create({ username, email, password: hash })
        res.status(201).json({ message: "user register successfully" })

    } catch (error) {
        res.status(500).json({ message: "error while registration" })
        console.log("error while registration", error)
    }
}


const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const userExist = await userModel.findOne({ email: email })
        if (userExist) {
            const isPasswordCorrect = bcrypt.compareSync(password, userExist.password)

            if (isPasswordCorrect) {
                const tkn = jwt.sign({ userId: userExist._id, email: userExist.email }, process.env.JWT_SECRET, { expiresIn:  "1 day"});
                return res.status(200).json({ message: "user login successfully", tkn, userExist })
            }
        }

        return res.status(404).json({ message: "user not found, please register " })

    } catch (error) {
        res.status(404).json({ message: "error while login" })
        console.log("error while login", error)
    }
}



const userProfile = async(req,res)=>{
    try {
        const {userId} = req.user
        const userProfile = await userModel.findOne({_id:userId})
        if(userProfile){
            return res.status(202).json({msg:"user found",userProfile})
        }
        return res.status(404).json({msg:"user not found"})
    } catch (error) {
        console.log("error while finding user profile",error)
        return res.status(500).json({msg:'something went wrong'})
    }
}




const updateProfile = async(req,res)=>{
    try {
        const {userId} = req.user
        const {username,email}=req.body
        const userExist = await userModel.findById(userId)
        if(userExist){
            const emailExist = await userModel.findOne({email})
            if(emailExist){
                return res.status(400).json({msg:"this email already registered"})
            }
            const updatedProfile = await userModel.findByIdAndUpdate(userId,{username,email},{new:true})
            return res.status(200).json({msg:"user updated successfully",updatedProfile})
        }
    } catch (error) {
        console.log("error while updating user",error)
        return res.status(500).json({msg:"something went wrong"})
    }
}








module.exports = { userRegister, userLogin, allUsers,userProfile,updateProfile}