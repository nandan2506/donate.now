const campaignModel = require("../models/campaign.model");
const donationModel = require("../models/donation.model");

const donate = async (req, res) => {
  try {
    const { userId } = req.user;
    const { campaignId } = req.params;
    const { amount } = req.body;
    const date = new Date();
    const donation = await donationModel.create({
      userId,
      campaignId,
      amount,
      donatedAt: date,
    });

    await campaignModel.findByIdAndUpdate(campaignId, {
      $inc: { raisedAmount: amount },
      $addToSet: { donors: userId },
    });

    return res.status(201).json({ msg: "donated successfully", donation });
  } catch (error) {
    console.log("error while donationg", error);
    return res.status(500).json({ msg: "something went wrong" });
  }
};

module.exports = donate;
