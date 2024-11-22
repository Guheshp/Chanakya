const express = require("express")
const userController = require("../controller/user.controller")
const router = express.Router()

router.post("/createstudent", userController.createStudent)
router.post("/createadmin", userController.createAdmin)
router.post("/login", userController.login)
router.post("/logout", userController.logOut)

module.exports = router 