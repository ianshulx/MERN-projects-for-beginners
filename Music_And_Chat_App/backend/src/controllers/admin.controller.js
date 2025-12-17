const Song = require("../models/song.model");
const Album = require("../models/album.model");
const cloudinary = require("../lib/cloudinary");

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (err) {
    console.log("Error in uploadToCloudinary:", err);
    throw new Error(err.message || "Cloudinary upload failed");
  }
};

const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({
        success: false,
        message: "Please upload both audio and image files"
      });
    }

    const { title, artist, albumId, duration } = req.body;
    
    // Validate required fields
    if (!title || !artist || !duration) {
      return res.status(400).json({
        success: false,
        message: "Title, artist, and duration are required"
      });
    }

    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration: parseInt(duration),
      albumId: albumId || null,
    });
    
    await song.save();
    
    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      }, { new: true });
    }

    res.status(201).json({
      success: true,
      message: "Song created successfully",
      song
    });
  } catch (err) {
    console.error("Error in createSong:", err);
    next(err);
  }
};

const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;

    const song = await Song.findById(id);
    
    if (!song) {
      return res.status(404).json({ 
        success: false,
        message: "Song not found" 
      });
    }

    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      }, { new: true });
    }

    await Song.findByIdAndDelete(id);

    res.status(200).json({ 
      success: true,
      message: "Song deleted successfully" 
    });
  } catch (error) {
    console.error("Error in deleteSong:", error);
    next(error);
  }
};

const createAlbum = async (req, res, next) => {
  try {
    if (!req.files || !req.files.imageFile) {
      return res.status(400).json({ 
        success: false,
        message: "Image file is required" 
      });
    }

    const { title, artist, releaseYear } = req.body;
    
    if (!title || !artist) {
      return res.status(400).json({
        success: false,
        message: "Title and artist are required"
      });
    }

    const imageFile = req.files.imageFile;
    const imageUrl = await uploadToCloudinary(imageFile);

    const album = new Album({
      title,
      artist,
      imageUrl,
      releaseYear: releaseYear || new Date().getFullYear(),
      songs: [] // Initialize empty songs array
    });

    await album.save();

    res.status(201).json({
      success: true,
      message: "Album created successfully",
      album
    });
  } catch (error) {
    console.error("Error in createAlbum:", error);
    next(error);
  }
};

const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const album = await Album.findById(id);
    if (!album) {
      return res.status(404).json({ 
        success: false,
        message: "Album not found" 
      });
    }
    
    await Song.deleteMany({ albumId: id });
    await Album.findByIdAndDelete(id);
    
    res.status(200).json({ 
      success: true,
      message: "Album and associated songs deleted successfully" 
    });
  } catch (error) {
    console.error("Error in deleteAlbum:", error);
    next(error);
  }
};

const checkAdmin = async (req, res, next) => {
  try {
    // For Clerk.js, you might need to verify the user role
    // This depends on how you've set up your Clerk middleware
    const userId = req.auth?.userId;
    
    if (!userId) {
      return res.status(401).json({ 
        success: false,
        admin: false, 
        message: "Unauthorized" 
      });
    }
    
    // Here you would typically check if the user has admin role
    // Example: Check in your database or Clerk metadata
    // const user = await User.findById(userId);
    // const isAdmin = user?.role === 'admin';
    
    // For now, assuming all authenticated users are admins
    // (You should implement proper role checking)
    res.status(200).json({ 
      success: true,
      admin: true, 
      userId: userId 
    });
    
  } catch (error) {
    console.error("Error in checkAdmin:", error);
    next(error);
  }
};

module.exports = {
  createSong,
  deleteSong,
  createAlbum,
  deleteAlbum,
  checkAdmin
};