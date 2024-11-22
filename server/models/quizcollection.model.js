const { default: mongoose } = require("mongoose");

const quizCollectionSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    category: {
        type: String,
    },
    totalMarks: {
        type: Number,
        trim: true,
        required: true,
    },
    timeLimit: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
})

const Quizes = mongoose.model("Quizes", quizCollectionSchema)

module.exports = { Quizes }