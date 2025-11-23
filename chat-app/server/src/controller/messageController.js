import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import { authModel } from "../model/authModel.js";
import { Message } from "../model/messageModel.js";

//get all the user except logged in user
export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filterUser = await authModel
      .find({ _id: { $ne: loggedInUserId } })
      .select("-password -__v");
    res.status(200).json({ users: filterUser });
  } catch (error) {
    console.log("somthing error while getting the users", error);
  }
};

export const getMessageById = async (req, res) => {
  try {
    const { id: otherId } = req.params; // all the other user that want to chat with me(in my browser)
    const myId = req.user._id;
    //got all the message from both ways
    const message = await Message.find({
      $or: [
        { senderId: myId, receiverId: otherId },
        { receiverId: myId, senderId: otherId },
      ],
    })
      .select("-__v -password")
      .sort({ createdAt: 1 }); //1 for ascending order
    res.status(200).json(message);
  } catch (error) {
    console.log("somthing went error in getting msg ", error);
  }
};
export const sendMessage = async (req, res) => {
  try {
    const { image, text } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let imageUrl;
    //add in cloud
    if (image) {
      const getImage = await cloudinary.uploader.upload(image);
      imageUrl = getImage.secure_url;
    }

    const newMessage = await new Message({
      text,
      image: imageUrl,
      senderId,
      receiverId,
    }).save();
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("somthing went error in sending msg ", error);
  }
};
