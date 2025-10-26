const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

const ConnectDB = require("./config/Mongoose");
const UserRouter = require("./routes/UserRouter");
const ImageRouter = require("./routes/ImageRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

ConnectDB();
app.use("/api/user", UserRouter);
app.use("/api/image", ImageRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
