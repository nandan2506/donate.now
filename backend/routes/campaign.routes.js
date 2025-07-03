const express = require("express")
const {newCampaign, updateCampaign, allCampaigns, campaignById, MyCampaigns, deleteCampaign} = require("../controllers/campaign.controllers")
const {auth} = require("../middlewares/auth.middleware")
const campaignRoutes = express.Router()



campaignRoutes.post("/newCampaign",auth,newCampaign)
campaignRoutes.patch("/updateCampaign/:id",auth,updateCampaign)
campaignRoutes.get("/allCampaigns/",allCampaigns)
campaignRoutes.get("/Campaign/:campId",campaignById)
campaignRoutes.get("/myCampaign/:userId",auth,MyCampaigns)
campaignRoutes.delete("/deleteCampaign/:campId",auth,deleteCampaign)






module.exports = campaignRoutes