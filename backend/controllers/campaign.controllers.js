const campaignModel = require("../models/campaign.model")
const userModel = require("../models/user.model")




const newCampaign = async(req , res)=>{
    try {
        const {userId} = req.user 
        const {title,description ,goalAmount,milestones,media} = req.body
        const newCampaign = await campaignModel.create({title,description ,goalAmount,milestones,media,owner:userId})
        return res.status(201).json({msg:"new campaign created",newCampaign})

    } catch (error) {
        console.log("error while creation new campaign",error)
        return res.status(500).json({msg:"something went wrong"})
    }
}




const updateCampaign = async(req , res)=>{
    try {
        const {id}=req.params
        const {title,description ,goalAmount,milestones,media} = req.body
        const updateCampaign = await campaignModel.findByIdAndUpdate({id},{title,description ,goalAmount,milestones,media})
        return res.status(201).json({msg:"new campaign created",updateCampaign})

    } catch (error) {
        console.log("error while creation new campaign",error)
        return res.status(500).json({msg:"something went wrong"})
    }
}





const allCampaigns = async(req ,res)=>{
    try {
        const campaigns = await campaignModel.find()
        if(campaigns.length === 0 )
            return res.status(200).json({msg:"no campaigns"})
        return res.status(200).json({campaigns})
    } catch (error) {
        console.log("error while getting all campaigns",error)
        return res.status(500).json({msg:"some thing went wrong"})
    }
}



const campaignById = async(req,res)=>{
    try {
        const {campId} = req.params
        const campaign = await campaignModel.findOne({campId})
        return res.status(200).json({msg:"campaign found",campaign})
    } catch (error) {
        console.log("error while getting campaign",error)
        return res.status(500).json({msg:"something went wrong"})
    }
}



const MyCampaigns = async(req,res)=>{
    try {
        const {userId} = req.params
        const campaigns = await campaignModel.find({owner:userId})
        if(campaigns.length==0){
            return res.status(200).json({msg:"no campaign found"})
        }
        return res.status(200).json({msg:"campaign found",allCampaigns:campaigns})
    } catch (error) {
        console.log("error while getting campaign",error)
        return res.status(500).json({msg:"something went wrong"})
    }
}



module.exports = {newCampaign,updateCampaign,allCampaigns,campaignById,MyCampaigns}