import jwt from "jsonwebtoken";
import { authModel } from "../model/authModel.js";

export const protectRoute = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, msg: "unauthorized- NO Token Provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, msg: "unauthorized - Wrong Token" });
    }
    const user = await authModel.findById(decoded.userId).select("-password");
    req.user = user;
    next();
  } catch (error) {
    console.log("somthing error while protecting route", error);
  }
};
