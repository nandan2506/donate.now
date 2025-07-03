const campaignModel = require("../models/campaign.model")
const commentModel = require("../models/comment.model")
const userModel = require("../models/user.model")




const newCampaign = async (req, res) => {
    try {
        const { userId } = req.user
        const { title, description, goalAmount, milestones, media } = req.body
        const newCampaign = await campaignModel.create({ title, description, goalAmount, milestones, media, owner: userId })
        await userModel.findByIdAndUpdate(userId, { $push: { campaignsCreated: newCampaign._id } }, { new: true })
        return res.status(201).json({ msg: "new campaign created", newCampaign })

    } catch (error) {
        console.log("error while creating new campaign", error)
        return res.status(500).json({ msg: "something went wrong" })
    }
}


const updateCampaign = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, goalAmount, milestones, media } = req.body;

        const updateCampaign = await campaignModel.findByIdAndUpdate(
            id,
            { title, description, goalAmount, milestones, media },
            { new: true }
        );

        if (!updateCampaign) {
            return res.status(404).json({ msg: "Campaign not found" });
        }

        return res.status(200).json({ msg: "Campaign updated successfully", updateCampaign });

    } catch (error) {
        console.log("Error while updating campaign", error);
        return res.status(500).json({ msg: "Something went wrong" });
    }
};


const allCampaigns = async (req, res) => {
    try {
        const campaigns = await campaignModel.find().populate("donors").populate("comments").sort({ createdAt: -1 })
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
            .populate("comments")
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
        const { campId } = req.params
        const { userId } = req.user
        const campaign = await campaignModel.findById(campId)
        // .populate("doners").populate("comments")

        if (!campaign) {
            return res.status(404).json({ msg: "Campaign not found" });
        }

        if (campaign.owner !== userId) {
            return res.status(403).json({ msg: "You are not authorized to delete this campaign" });
        }

        await userModel.findByIdAndUpdate(campaign.owner, {
            $pull: { campaignsCreated: campId }
        })

        for (const donor of campaign.donors) {
            await userModel.findByIdAndUpdate(donor._id, {
                $pull: { donationsMade: campId }
            });
        }

        for (const commentId of campaign.comments) {
            await userModel.findByIdAndUpdate(userId, { $pull: { commentsMade: commentId } }, { new: true })
            await commentModel.findByIdAndDelete(commentId)
        }

        await campaignModel.findByIdAndDelete(campId)
        return res.status(200).json({ msg: "Campaign deleted successfully" })

    } catch (error) {
        console.error("Error while deleting campaign:", error)
        return res.status(500).json({ msg: "Something went wrong" })
    }
}


module.exports = { newCampaign, updateCampaign, allCampaigns, campaignById, MyCampaigns, deleteCampaign }