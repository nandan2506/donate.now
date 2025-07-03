const campaignModel = require("../models/campaign.model")
const moneySpendModel = require("../models/moneySpend.model")


const spendMoney = async (req, res) => {
    try {
        const { campId } = req.params
        const { userId } = req.user
        const { sendTo, description, amount } = req.body
        const campaign = await campaignModel.findById(campId).populate("donors")
        if (campaign.owner == userId) {
            const moneyspended = await moneySpendModel.create({ sendTo, description, date: new Date(), campaignId: campId, amount })
            await campaignModel.findByIdAndUpdate(
                campId,
                {
                    $inc: { raisedAmount: -amount },
                    $push: { moneySpend: moneyspended._id }
                },
                { new: true }
            );
            res.status(200).json({ msg: "money spended successfully!", moneyspended })
        }
        return res.status(403).json({ msg: "Only the campaign owner can spend money." })
    } catch (error) {
        console.log("something went wrong while spending money", error)
        return res.status(500).json({ msg: "something went wrong" })
    }
}


const seeMoneySpend = async (req, res) => {
    try {
        const { campId } = req.params
        const { userId } = req.user
        const campaign = await campaignModel.findById(campId).populate("donors")
        const isDonor = campaign.donors.some(donor => donor._id.toString() === userId)
        if (campaign.owner == userId || isDonor) {
            const moneySpend = campaign.moneySpend || []
            res.status(200).json({ msg: "money spend record", moneySpend })
        }
        return res.status(400).json({ msg: "please donate to see money spend track!" })
    } catch (error) {
        console.log("something went wrong while spending money", error)
        return res.status(500).json({ msg: "something went wrong" })
    }
}


module.exports = { spendMoney, seeMoneySpend }