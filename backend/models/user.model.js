const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    username: String,
    email: { type: String, required: true },
    password: String,
    // badges: [String],  
    campaignsCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: "campaign" }],
    donationsMade: [{ type: mongoose.Schema.Types.ObjectId, ref: "donation" }]
  }
);

const userModel = mongoose.model("user", userSchema)

module.exports = userModel;
