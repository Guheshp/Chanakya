const express = require("express")
const { connectDB } = require("./config/database")
const app = express()
require("dotenv").config()
const PORT = process.env.PORT
const cookieparser = require("cookie-parser")

app.use(express.json())
app.use(cookieparser())

const userRouter = require("./router/user.router")
const quizCollection = require("./router/quizcollection.router")

app.use("/api", userRouter)
app.use("/api", quizCollection)

app.get("/test", (req, res) => {
    res.send("Everything working fine!")
})


connectDB()
    .then(() => {
        console.log("Database connected successfully!")
        app.listen(PORT, () => {
            console.log(`Server started at 🚀 http://localhost:${PORT}`)
        })
    })
    .catch(() => {
        console.log("Error while connecting to database!")
    })

