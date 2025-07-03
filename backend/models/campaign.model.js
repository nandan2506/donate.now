const mongoose = require("mongoose")


const campaignSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        goalAmount: Number,
        raisedAmount: { type: Number, default: 0 },
        donors: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
        owner: {type:mongoose.Schema.Types.ObjectId,ref:"user"},
        milestones: [Number],  // like 25%, 50%
        media: [String], // URLs
        createdAt: Date,
        comments:[{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
        moneySpend:[{type: mongoose.Schema.Types.ObjectId, ref: "comment" }]
      }
)


const campaignModel = mongoose.model("campaign",campaignSchema)
  
module.exports = campaignModel