const express = require("express")
const {newCampaign, updateCampaign, allCampaigns, campaignById, MyCampaigns} = require("../controllers/campaign.controllers")
const auth = require("../middlewares/auth.middleware")
const campaignRoutes = express.Router()



campaignRoutes.post("/newCampaign",auth,newCampaign)
campaignRoutes.patch("/updateCampaign/:id",auth,updateCampaign)
campaignRoutes.get("/allCampaign/",allCampaigns)
campaignRoutes.get("/Campaign/:campId",auth,campaignById)
campaignRoutes.get("/myCampaign/:userId",auth,MyCampaigns)






module.exports = campaignRoutes