const jwt = require("jsonwebtoken")
require("dotenv").config()


const auth = async(req,res,next)=>{
    try {
        const token = req.headers.authorization?.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if(err){
                console.log("error while token verifing",err)
                return res.status(404).json({msg:'please login'})
                
            }
            req.user=decoded
            next() 
          })
    } catch (error) {
        console.log("error while verifing the token")
    }
}

module.exports = auth