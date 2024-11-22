const jwt = require("jsonwebtoken")
const { User } = require("../models/user.model")

const adminAccess = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Please Login!"
            })
        }
        const decodedMessage = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { _id } = decodedMessage
        const user = await User.findById(_id)
        if (!user) {
            throw new Error("User not found!")
        }
        if (user.role !== "admin") {
            return res.status(401).json({
                message: "Don't have permission!"
            })
        }
        req.user = user
        next()
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in adminAccess" + error.message,
            error: "Error: " + error.message,
        });
    }
}

module.exports = {
    adminAccess
}