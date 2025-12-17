const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log(`MongoDB connected successfully ${mongoose.connection.host}`);
    }).catch((err) => {
        console.log(`MongoDB connection failed: ${err.message}`);
        process.exit(1);
    });
}

module.exports = connectDB;