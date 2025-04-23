const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user"},
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: "campaign" },
  amount: { type: Number, required: true },
  donatedAt: { type: Date, default: Date.now }
});

const donationModel = mongoose.model("donation", donationSchema);

module.exports = donationModel;
