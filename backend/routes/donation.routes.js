const express = require("express")
const donate = require("../controllers/donation.controllers")
const auth = require("../middlewares/auth.middleware")
const donationRoutes = express.Router()

donationRoutes.post("/donate/:campaignId",auth,donate)



module.exports = donationRoutes