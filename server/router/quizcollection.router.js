const express = require("express")
const quizController = require("../controller/quizcollection.controller")
const router = express.Router()
const { userAuth } = require("../middleware/auth.middleware")
const { adminAccess } = require("../middleware/admin.middleware")

router.post("/admin/create-quiz", userAuth, adminAccess, quizController.createQuizes)
router.get("/admin/all-quiz", userAuth, adminAccess, quizController.getAllQuizes)


module.exports = router 