const mongoose = require("mongoose")

const moneySpendSchema = mongoose.Schema({
    "sendTo":{type:String,required:true},
    "description":{type:String,required:true},
    "campaignId":{type: mongoose.Schema.Types.ObjectId,ref:"campaign"},
    "amount":Number,
    "date":{type:Date}
})

const moneySpendModel = mongoose.model("moneySpend",moneySpendSchema)

module.exports = moneySpendModel