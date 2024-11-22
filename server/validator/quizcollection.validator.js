const validator = require("validator");

const validateQuizCollection = async (req) => {
    const { title, description, category, totalMarks, timeLimit, status, userId } = req.body;

    if (!title || typeof title !== "string" || validator.isEmpty(title.trim())) {
        throw new Error("Title is required and must be a non-empty string.");
    }
    if (title.length > 255) {
        throw new Error("Title must not exceed 255 characters.");
    }

    if (!description || typeof description !== "string" || validator.isEmpty(description.trim())) {
        throw new Error("Description is required and must be a non-empty string.");
    }
    if (description.length > 2000) {
        throw new Error("Description must not exceed 2000 characters.");
    }

    if (!category || typeof category !== "string" || validator.isEmpty(category.trim())) {
        throw new Error("Category is required and must be a non-empty string.");
    }

    if (!totalMarks || !validator.isInt(totalMarks.toString(), { min: 1 })) {
        throw new Error("Total Marks is required and must be a positive integer.");
    }

    if (!timeLimit || !validator.isInt(timeLimit.toString(), { min: 1 })) {
        throw new Error("Time Limit is required and must be a positive integer.");
    }

    return true;
};

module.exports = validateQuizCollection;
