const { User } = require("../models/user.model");
const bcrypt = require("bcrypt")
const validateUser = require("../validator/user.validator");

const createStudent = async (req, res) => {
    try {
        validateUser(req)
        const { userName, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email is already registered.",
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await new User({
            userName: userName,
            email: email,
            password: passwordHash,
            role: "student"
        })

        await newUser.save()

        res.status(200).json({
            success: true,
            message: "User created successfully!",
            data: newUser
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error while createing user",
            error: "ERROR: " + error.message
        })
    }
}

const createAdmin = async (req, res) => {
    try {
        validateUser(req)
        const { userName, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email is already registered.",
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await new User({
            userName: userName,
            email: email,
            password: passwordHash,
            role: "admin"
        })

        await newUser.save()

        res.status(200).json({
            success: true,
            message: "User created successfully!",
            data: newUser
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error while createing user",
            error: "ERROR: " + error.message
        })
    }
}


const generateAccessToken = async (user) => {
    const payload = {
        _id: user._id,
        userName: user.userName,
        email: user.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
    return token;
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: `Invalid credentials!`
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            const token = await generateAccessToken(user)
            res.cookie("token", token, { httpOnly: true })

            res.status(200).json({
                success: true,
                message: "Login successfully!",
                token: token,
                data: user
            })
        } else {
            throw new Error("Invalid credentials!")
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "error while login",
            error: "ERROR: " + error.message,
        })
    }
}

module.exports = {
    createStudent,
    createAdmin,
    login
}