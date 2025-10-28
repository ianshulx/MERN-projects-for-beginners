const express = require("express");
const auth = require("../middleware/auth");
const {
  getPalettes,
  savePalette,
  deletePalette,
} = require("../controllers/paletteController");

const router = express.Router();

// All routes are protected with auth middleware
router.get("/", auth, getPalettes);
router.post("/", auth, savePalette);
router.delete("/:id", auth, deletePalette);

module.exports = router;
