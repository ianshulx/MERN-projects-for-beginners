const Message = require("../models/message.model");
const User = require("../models/user.model")

const getAllUser = async (req, res, next) => {
    try {
        const currentUderId = req.auth.userId;
        const user = await User.find({ clerkId: { $ne: currentUderId } })
        res.status(200).json({
            success: true,
            message: "Get All Users Successfully",
            user
        })
    } catch (error) {
        next(error)
    }
}


const getMessage = async (req, res, next) => {
    try {
        const myId = req.auth.userId;
        const { userId } = req.params;

        const messages = await Message.find({
            $or: [
                { senderId: userId, receiverId: myId },
                { senderId: myId, receiverId: userId },
            ],
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (err) {
        next(err)
    }
}


module.exports = {
    getAllUser,
    getMessage
}