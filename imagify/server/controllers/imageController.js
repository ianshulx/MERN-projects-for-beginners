const axios = require("axios");
const FormData = require("form-data");
const userModel = require("../models/UserModel");

const generateImage = async (req, res) => {
  try {
    const { userId, prompt } = req.body;
    const user = await userModel.findById(userId);

    if (!user || !prompt) {
      return res.status(400).json({ success: false, message: "Invalid data" });
    }

    if (user.creditBalance < 1) {
      return res.status(400).json({
        success: false,
        message: "Insufficient credits",
        creditBalance: user.creditBalance,
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);
    
    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer",
      }
    );

    console.log(data);

    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    await userModel.findByIdAndUpdate(userId, {
      $inc: { creditBalance: -1 },
    });

    res.json({
      success: true,
      message: "Image generated successfully",
      creditBalance: user.creditBalance - 1,
      image: resultImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { generateImage };
