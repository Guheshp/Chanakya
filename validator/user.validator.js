const validator = require("validator");

const validateUser = (req) => {
    const { userName, email, password } = req.body;

    if (!userName) {
        throw new Error("Username is required.");
    }
    if (userName.length < 3 || userName.length > 100) {
        throw new Error("Username must be at minimum 3 and maximum 100 characters long.");
    }
    if (!email) {
        throw new Error("Email is required.");
    }
    if (!validator.isEmail(email)) {
        throw new Error("Invalid email format.");
    }
    if (!password) {
        throw new Error("Password is required.");
    }
    if (!validator.isStrongPassword(password, { minLength: 8, minSymbols: 1 })) {
        throw new Error(
            "Password must be at least 8 characters long and include at least 1 symbol."
        );
    }
};

module.exports = validateUser;
