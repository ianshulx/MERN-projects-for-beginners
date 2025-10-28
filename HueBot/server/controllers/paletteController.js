const Palette = require("../models/Palette");

// Get all colour palettes for logged in user
exports.getPalettes = async (req, res) => {
  try {
    const palettes = await Palette.find({ user: req.userId }).sort({
      createdAt: -1,
    });
    res.json({ success: true, palettes });
  } catch (error) {
    console.error("Get palettes error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Save a new colour palette
exports.savePalette = async (req, res) => {
  try {
    const { name, colors } = req.body;

    // Validate input
    if (!name || !colors || !Array.isArray(colors) || colors.length === 0) {
      return res.status(400).json({ message: "Name and colors are required" });
    }

    // Create new colour palette
    const palette = new Palette({
      user: req.userId,
      name,
      colors,
    });

    await palette.save();

    res.status(201).json({
      success: true,
      message: "Palette saved successfully",
      palette,
    });
  } catch (error) {
    console.error("Save palette error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete a colour palette
exports.deletePalette = async (req, res) => {
  try {
    const palette = await Palette.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!palette) {
      return res
        .status(404)
        .json({ success: false, message: "Palette not found" });
    }

    await Palette.deleteOne({ _id: req.params.id });
    res.json({ success: true, message: "Palette deleted successfully" });
  } catch (error) {
    console.error("Delete palette error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
