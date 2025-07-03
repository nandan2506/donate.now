const campaignModel = require("../models/campaign.model")
const commentModel = require("../models/comment.model")
const userModel = require("../models/user.model")


const addComment = async (req, res) => {
    try {
        const { campId } = req.params;
        const { userId } = req.user;
        const { commentText } = req.body;

        const comment = await commentModel.create({
            commentText,
            campaignId: campId,
            userId,
        });

        const campaign = await campaignModel.findById(campId);
        if (!campaign) {
            return res.status(404).json({ msg: "Campaign not found" });
        }

        campaign.comments.push(comment._id);
        await campaign.save();

        await userModel.findByIdAndUpdate(
            userId,
            { $push: { commentsMade: comment._id } },
            { new: true }
        );

        const updatedCampaign = await campaignModel.findById(campId).populate("comments");

        return res.status(201).json({ msg: "Comment added", campaign: updatedCampaign });
    } catch (error) {
        console.error("Error while adding comment:", error);
        return res.status(500).json({ msg: "Something went wrong" });
    }
};



const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params
        const { userId } = req.user
        const comment = await commentModel.findById(commentId).populate("campaignId")
        if (!comment) {
            return res.status(404).json({ msg: "comment not found" })
        }
        if (comment.userId == userId) {

            await userModel.findByIdAndUpdate(userId, { $pull: { commentsMade: commentId } }, { new: true })

            await campaignModel.findByIdAndUpdate(comment.campaignId._id, {
                $pull: { comment: commentId }
            })
            await commentModel.findByIdAndDelete(commentId)

            return res.status(201).json({ msg: "comment deleted" })
        }

    } catch (error) {
        console.error("Error while deleting comment:", error);
        return res.status(500).json({ msg: "Something went wrong" })
    }
}

module.exports = { addComment, deleteComment }