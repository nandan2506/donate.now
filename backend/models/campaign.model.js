const mongoose = require("mongoose")

const campaignSchema = new mongoose.Schema({
  title: String,
  description: String,
  goalAmount: Number,
  raisedAmount: { type: Number, default: 0 },
  donors: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  beneficiary: { type: String },
  dp: { type: String }, // Display image URL
  milestones: [Number],
  media: [String],
  endDate: Date,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
  moneySpend: [{ type: mongoose.Schema.Types.ObjectId, ref: "spending" }], // if using a spending model
  status: {
    type: String,
    enum: ['draft', 'active', 'completed', 'expired'],
    default: 'draft'
  },
  tags: [String],
  category: String,
  updates: [{
    title: String,
    body: String,
    createdAt: { type: Date, default: Date.now }
  }],
  location: {
    city: String,
    state: String,
    country: String
  }
}, { timestamps: true });



const campaignModel = mongoose.model("campaign", campaignSchema)

module.exports = campaignModel