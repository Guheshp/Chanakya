const { default: mongoose } = require("mongoose")

const connectDB = async () => {
    await mongoose.connect(`mongodb+srv://Guheshpanjagall:${process.env.MONGODB_USER_PASSWORD}@devtinder.6kstj.mongodb.net/Chanakya`)
}

module.exports = { connectDB }