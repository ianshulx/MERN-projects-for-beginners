const mongoose = require("mongoose");

const paletteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  colors: {
    type: [String],
    required: true,
    validate: {
      validator: function (colors) {
        return colors.length > 0 && colors.length <= 10;
      },
      message: "A palette must have between 1 and 10 colors",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Palette", paletteSchema);
