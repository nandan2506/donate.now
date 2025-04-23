const mongoose = require("mongoose")
require("dotenv").config()
const url = process.env.MONGODB_URL

const connection = async()=>{
    try {
        await mongoose.connect(url)
        console.log("connected to db")
    } catch (error) {
        console.log("error while connecting to db",error)
    }
}

module.exports = connection