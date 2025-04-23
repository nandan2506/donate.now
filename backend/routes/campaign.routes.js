const express = require("express")
const {newCampaign, updateCampaign, allCampaigns} = require("../controllers/campaign.controllers")
const auth = require("../middlewares/auth.middleware")
const campaignRoutes = express.Router()



campaignRoutes.post("/newCampaign",auth,newCampaign)
campaignRoutes.patch("/newCampaign/:id",auth,updateCampaign)
campaignRoutes.get("/allCampaign/",allCampaigns)





module.exports = campaignRoutes