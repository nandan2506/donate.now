

const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        if (!token) {
            return res.status(403).json({ msg: "Token missing. Please login." });
        }

        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if (err) {
                console.log("Error while verifying token", err);
                return res.status(401).json({ msg: "Invalid or expired token. Please login again." });
            }

            req.user = decoded

            next()
        })
    } catch (error) {
        console.log("Error while verifying the token", error)
        return res.status(500).json({ msg: "Internal server error." })
    }
}

module.exports = auth
