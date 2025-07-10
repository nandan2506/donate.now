const { transporter } = require("../middlewares/email.config");
const campaignModel = require("../models/campaign.model");
const donationModel = require("../models/donation.model");
const userModel = require("../models/user.model");
const nodemailer = require("nodemailer");

const donate = async (req, res) => {
  try {
    const { userId } = req.user;
    const { campaignId } = req.params;
    const { amount } = req.body;
    const date = new Date();

    // ✅ Check if user is verified
    const donor = await userModel.findById(userId);
    if (!donor || !donor.isVerified) {
      return res.status(403).json({ msg: "Only verified users can donate." });
    }

    // ✅ Create donation
    const donation = await donationModel.create({
      userId,
      campaignId,
      amount,
      donatedAt: date,
    });

    // ✅ Add donation reference to user
    await userModel.findByIdAndUpdate(userId, {
      $push: { donationsMade: donation._id },
    });

    // ✅ Update campaign and populate owner
    const campaign = await campaignModel.findByIdAndUpdate(
      campaignId,
      {
        $inc: { raisedAmount: amount },
        $addToSet: { donors: userId },
      },
      { new: true }
    ).populate("owner", "email name");

    const ownerEmail = campaign.owner?.email;
    const ownerName = campaign.owner?.name;

    

    // 📧 Email to Donor
    await transporter.sendMail({
      from: `"DonateNow" <donatenow.care@gmail.com>`,
      to: donor.email,
      subject: "Donation Successful - DonateNow",
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Hi ${donor.username},</h2>
          <p>Thank you for your generous donation of <strong>₹${amount}</strong> to <strong>${campaign.title}</strong>.</p>
          <p>Your support makes a real difference!</p>
          <br />
          <p>— Team DonateNow</p>
        </div>
      `,
    });

    // 📧 Email to Campaign Owner
    if (ownerEmail) {
      await transporter.sendMail({
        from: `"DonateNow" <donatenow.care@gmail.com>`,
        to: ownerEmail,
        subject: "New Donation Received!",
        html: `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2>Hello ${ownerName || "Campaign Owner"},</h2>
            <p><strong>${donor.username}</strong> just donated <strong>₹${amount}</strong> to your campaign: <strong>${campaign.title}</strong>.</p>
            <p>Keep up the great work!</p>
            <br />
            <p>— Team DonateNow</p>
          </div>
        `,
      });
    }

    return res.status(201).json({ msg: "Donated successfully", donation });
  } catch (error) {
    console.error("Error while donating:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

module.exports = donate;
