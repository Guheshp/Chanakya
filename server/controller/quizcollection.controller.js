const { default: mongoose } = require("mongoose")
const { Quizes } = require("../models/quizcollection.model")
const validateQuizCollection = require("../validator/quizcollection.validator")

const createQuizes = async (req, res) => {
    try {
        validateQuizCollection(req)
        const { title, description, category, totalMarks, timeLimit } = req.body

        if (!req.user || !req.user._id) {
            return res.status(403).json({
                success: false,
                message: "User not authenticated."
            });
        }

        const newQuiz = await new Quizes({
            title,
            description,
            category,
            totalMarks,
            timeLimit,
            userId: req.user._id
        })

        await newQuiz.save()

        res.status(200).json({
            success: true,
            message: "Quize created successfully",
            data: newQuiz
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error while createing Quize",
            error: "ERROR: " + error.message
        })
    }
}

const getAllQuizes = async (req, res) => {
    try {
        const allQuizes = await Quizes.find()
        res.status(200).json({
            success: true,
            message: "All Quiz fetched successfully!",
            data: allQuizes
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error while createing Quize",
            error: "ERROR: " + error.message
        })
    }
}


module.exports = { createQuizes, getAllQuizes }