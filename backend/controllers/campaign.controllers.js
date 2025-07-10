const { transporter } = require("../middlewares/email.config");
const campaignModel = require("../models/campaign.model")
const commentModel = require("../models/comment.model")
const userModel = require("../models/user.model")
const nodemailer = require("nodemailer")




const newCampaign = async (req, res) => {
    try {
        const { userId } = req.user;
        const {
            title, description, goalAmount, milestones, media,
            beneficiary, dp, tags, category, endDate, location
        } = req.body;

        // ✅ Check if user is verified
        const user = await userModel.findById(userId);
        if (!user || !user.isVerified) {
            return res.status(403).json({ msg: "Only verified users can create campaigns." });
        }

        const newCampaign = await campaignModel.create({
            title,
            description,
            goalAmount,
            milestones,
            media,
            beneficiary,
            dp,
            tags,
            category,
            endDate: new Date(endDate),
            location,
            owner: userId,
        });

        await userModel.findByIdAndUpdate(
            userId,
            { $push: { campaignsCreated: newCampaign._id } },
            { new: true }
        );

        

        // ✅ Send confirmation email
        await transporter.sendMail({
            from: `"DonateNow" <donatenow.care@gmail.com>`,
            to: user.email,
            subject: "Campaign Created Successfully!",
            html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Hello ${user.username},</h2>
          <p>🎉 Your campaign <strong>"${title}"</strong> has been successfully created on <strong>DonateNow</strong>!</p>
          <p>You're one step closer to making a difference. Share your campaign and start receiving support!</p>
          <p><strong>Goal:</strong> ₹${goalAmount}</p>
          <p><strong>End Date:</strong> ${new Date(endDate).toLocaleDateString()}</p>
          <br />
          <p>— Team DonateNow</p>
        </div>
      `
        });

        return res.status(201).json({ msg: "New campaign created", newCampaign });
    } catch (error) {
        console.log("Error while creating new campaign:", error);
        return res.status(500).json({ msg: "Something went wrong" });
    }
};



const updateCampaign = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.user;
        const { title, description, goalAmount, milestones, media } = req.body;

        const campaign = await campaignModel.findById(id);
        if (!campaign) {
            return res.status(404).json({ msg: "Campaign not found" });
        }

        // ✅ Check ownership
        if (campaign.owner.toString() !== userId) {
            return res.status(403).json({ msg: "You are not authorized to update this campaign" });
        }

        // ✅ Check if user is verified
        const user = await userModel.findById(userId);
        if (!user || !user.isVerified) {
            return res.status(403).json({ msg: "Only verified users can update campaigns." });
        }

        const updatedCampaign = await campaignModel.findByIdAndUpdate(
            id,
            { title, description, goalAmount, milestones, media },
            { new: true }
        );

        

        await transporter.sendMail({
            from: `"DonateNow" <donatenow.care@gmail.com>`,
            to: user.email,
            subject: "Campaign Updated Successfully!",
            html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Hello ${user.username},</h2>
          <p>Your campaign <strong>"${updatedCampaign.title}"</strong> has been successfully updated.</p>
          <p><strong>Goal:</strong> ₹${updatedCampaign.goalAmount}</p>
          <p><strong>Description:</strong> ${updatedCampaign.description}</p>
          <p>Visit your campaign dashboard for more details.</p>
          <br/>
          <p>— Team DonateNow</p>
        </div>
      `
        });

        return res.status(200).json({ msg: "Campaign updated successfully", updateCampaign: updatedCampaign });

    } catch (error) {
        console.log("Error while updating campaign", error);
        return res.status(500).json({ msg: "Something went wrong" });
    }
};




const allCampaigns = async (req, res) => {
    try {
        const campaigns = await campaignModel.find().populate("owner").sort({ createdAt: -1 })
        if (!campaigns)
            return res.status(200).json({ msg: "no campaigns" })
        return res.status(200).json({ campaigns })
    } catch (error) {
        console.log("error while getting all campaigns", error)
        return res.status(500).json({ msg: "some thing went wrong" })
    }
}


const campaignById = async (req, res) => {
    try {
        const { campId } = req.params;
        const campaign = await campaignModel.findById(campId)
            .populate({
                path: "owner",   
                select: "username"
            })
            .populate({
                path: "comments",
                populate: {
                    path: "userId",
                    select: "username"
                }
            });


        if (campaign) {
            return res.status(200).json({ msg: "Campaign found", campaign });
        }
        return res.status(404).json({ msg: "No campaign found" });
    } catch (error) {
        console.error("Error while getting campaign", error);
        return res.status(500).json({ msg: "Something went wrong" });
    }
}


const MyCampaigns = async (req, res) => {
    try {
        const { userId } = req.params
        const campaigns = await campaignModel.find({ owner: userId })
            .populate("donors")
            .populate("comments").populate('owner')
        if (campaigns.length == 0) {
            return res.status(200).json({ msg: "no campaign found" })
        }
        console.log(campaigns)
        return res.status(200).json({ msg: "campaign found", allCampaigns: campaigns })
    } catch (error) {
        console.log("error while getting campaign", error)
        return res.status(500).json({ msg: "something went wrong" })
    }
}



const deleteCampaign = async (req, res) => {
    try {
        const { campId } = req.params;
        const { userId } = req.user;

        const campaign = await campaignModel.findById(campId);
        if (!campaign) {
            return res.status(404).json({ msg: "Campaign not found" });
        }

        if (campaign.owner.toString() !== userId) {
            return res.status(403).json({ msg: "You are not authorized to delete this campaign" });
        }

        const user = await userModel.findById(userId);
        if (!user || !user.isVerified) {
            return res.status(403).json({ msg: "Only verified users can delete campaigns." });
        }

        // Remove campaign from user's list
        await userModel.findByIdAndUpdate(campaign.owner, {
            $pull: { campaignsCreated: campId }
        });

        // Remove donations from donor records
        for (const donor of campaign.donors) {
            await userModel.findByIdAndUpdate(donor._id, {
                $pull: { donationsMade: campId }
            });
        }

        // Delete all comments and references
        for (const commentId of campaign.comments) {
            await userModel.findByIdAndUpdate(userId, {
                $pull: { commentsMade: commentId }
            });
            await commentModel.findByIdAndDelete(commentId);
        }

        await campaignModel.findByIdAndDelete(campId);

        

        await transporter.sendMail({
            from: `"DonateNow" <donatenow.care@gmail.com>`,
            to: user.email,
            subject: "Campaign Deleted - DonateNow",
            html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Hello ${user.username},</h2>
          <p>Your campaign titled <strong>${campaign.title}</strong> has been successfully deleted.</p>
          <p>If this was not intended, please contact our support team immediately.</p>
          <br />
          <p>— Team DonateNow</p>
        </div>
      `,
        });

        return res.status(200).json({ msg: "Campaign deleted successfully" });

    } catch (error) {
        console.error("Error while deleting campaign:", error);
        return res.status(500).json({ msg: "Something went wrong" });
    }
};





module.exports = { newCampaign, updateCampaign, allCampaigns, campaignById, MyCampaigns, deleteCampaign }