import cloudinary from "../lib/cloudinary.js";
import { genToken } from "../lib/util.js";
import { authModel } from "../model/authModel.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    //validation
    if (!email) {
      res.json({ msg: "email is reqiured" });
    }
    if (!fullName) {
      return res.json({ msg: "fullName is reqiured" });
    } else if (fullName.length < 3) {
      return res.json({ msg: "fullName must be at least 3 digits" });
    }
    if (!password) {
      return res.json({ msg: "password is required" });
    } else if (password.length < 6) {
      return res.json({ msg: "password must be at least 5 digits" });
    }
    const saltRounds = await bcrypt.genSalt(8);
    const hashPass = await bcrypt.hash(password, saltRounds);
    //add the data in db
    const NewUser = await new authModel({
      fullName,
      password: hashPass,
      email,
    }).save();
    //create token
    if (NewUser) {
      genToken(NewUser._id, res);
    }
    //send res
    res.status(201).json({ success: true, user: NewUser });
  } catch (err) {
    //for duplication err
    if (err.code === 11000) {
      // duplicate email error
      return res.status(400).json({ msg: "Email already exists" });
    }
    console.log("somthing error while signup", err);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await authModel.findOne({ email });
    //check the email
    if (!user) {
      return res
        .status(401)
        .json({ success: false, msg: "invalid credentials" });
    }
    //check the password
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res
        .status(401)
        .json({ success: false, msg: "invalid credentials" });
    }
    //success
    if (user) {
      genToken(user._id, res);
      res.status(200).json({ success: true, msg: "successfully login", user });
    }
  } catch (error) {
    res.status(500).json({ msg: "server internal error" });
    console.log("somthing errror while login", error);
  }
};

export const logout = (req, res) => {
  //remove token
  res.cookie("token", "", { maxAge: 0 });
  res.status(200).json({ success: true, msg: "successfully logout" });
};

export const updateProfilePic = async (req, res) => {
  try {
    const { profilePic } = req.body; //this image is object i mean in object format not an url / or we can also pass the base64 string
    const id = req.user._id;
    if (!profilePic) {
      return res.status(400).json({ msg: "image is required" });
    }

    //uoload in clouad
    const updatePic = await cloudinary.uploader.upload(profilePic);
    const pic = await authModel.findByIdAndUpdate(
      id,
      {
        profilePic: updatePic.secure_url,
      },
      { new: true }
    );
    res.status(200).json({ success: true, user: pic });
  } catch (error) {
    res.status(500).json({ msg: "server internal error" });
    console.log("somthing errror while updating profile", error);
  }
};
export const checkAuth = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(500).json({ msg: "server internal error" });
    console.log("somthing errror while checking user", error);
  }
};
