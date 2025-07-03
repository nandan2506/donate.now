
const express = require("express")
const { spendMoney, seeMoneySpend } = require("../controllers/moneySpend.controllere")
const { auth } = require("../middlewares/auth.middleware")
const moneySpendRouter = express.Router()


moneySpendRouter.post("/spendMoney", auth ,spendMoney)
moneySpendRouter.get("/seeMoneySpend", auth, seeMoneySpend)


module.exports = moneySpendRouter