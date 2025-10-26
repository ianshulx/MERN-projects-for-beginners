const express = require("express");
const ImageRouter = express.Router();
const UserAuth = require("../middlewares/auth");

const { generateImage } = require("../controllers/imageController");

ImageRouter.post("/generate-image", UserAuth, generateImage);

module.exports = ImageRouter;