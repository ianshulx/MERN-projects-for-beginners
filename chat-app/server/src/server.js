import dotenv from "dotenv";
import express from "express";
import authRoute from "./routes/authRoute.js";
import messageRoute from "./routes/messageRoute.js";
import { connectDB } from "./lib/mongoDb.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { app, server } from "./lib/socket.js";
//to get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//config
dotenv.config();
//middleware
app.use(express.static(path.join(__dirname, "../public")));
app.use(cookieParser());
app.use(express.json({ limit: "10mb", extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.get("/api/auth", (req, res) => {
  res.send("Auth API");
});
//routes
app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

server.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
  connectDB();
});
