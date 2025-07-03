const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  // isVerified: {type: Boolean,default: false},
  role:{type:String,default:"user",enum:["user","admin"]},
  campaignsCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: "campaign" }],
  donationsMade: [{ type: mongoose.Schema.Types.ObjectId, ref: "donation" }],
  commentsMade: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
