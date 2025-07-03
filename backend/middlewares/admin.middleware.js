const userModel = require("../models/user.model")

const isAdmin = async(req,res,next)=>{
    try {
        const {userId} = req.user 
        const user = await userModel.findById(userId)
        if(user.role=="admin"){
            next()
            return
        }
        return res.status(400).json({msg:"not authorized"})
    } catch (error) {
        console.log("error while verifying admin in admin middleware",error)
        return res.status(500).json({msg:"something went wrong"})
    }
}

module.exports = {isAdmin}