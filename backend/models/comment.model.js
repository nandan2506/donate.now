const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    campaignId: { type: mongoose.Schema.Types.ObjectId, ref: "campaign" },
    commentText: {
      type: String,
      required: [true, "Comment is required"],
      trim: true
    }
  },
  { timestamps: true } // Adds createdAt and updatedAt
);

const commentModel = mongoose.model("comment", commentSchema);

module.exports = commentModel;
