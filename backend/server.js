const express = require("express")
const connection = require("./config/db")

const userRoutes = require("./routes/user.routes")
const commentRoutes = require("./routes/comment.routes")
const donationRoutes = require("./routes/donation.routes")
const campaignRoutes = require("./routes/campaign.routes")
const moneySpendRouter = require("./routes/moneySpend.routes")

const app = express()
app.use(express.json())
require("dotenv").config()
const PORT = process.env.PORT || 8080


const cors = require("cors")
app.use(cors())



app.get("/home", (req, res) => {
    res.send("api on working")
})

app.use("/user", userRoutes)
app.use("/campaign", campaignRoutes)
app.use("/comment", commentRoutes)
app.use("/donation", donationRoutes)
app.use("/moneySpend", moneySpendRouter)


app.use((req, res) => {
    res.status(404).json({ msg: "Route not found" });
})



app.listen(PORT, async () => {
    await connection()
    console.log("server started on port", PORT)
})