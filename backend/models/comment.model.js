const mongoose = require("mongoose")


const commentSchema = new mongoose.Schema(
    {
        userId: {type:mongoose.Schema.Type.ObjectId,ref:"user"},
        campaignId: {type:mongoose.Schema.Type.ObjectId,ref:"campaign"},
        commentText: String,
        media: [String],
        createdAt: Date
      }
)


const commentModel = mongoose.model("campaign",commentSchema)
  
module.exports = commentModel