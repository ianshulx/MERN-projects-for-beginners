const express = require('express');
const router = express.Router();
const { protectRoute, requireAdmin } = require('../middleware/auth.middleware');
const { createSong, deleteAlbum, createAlbum, deleteSong, checkAdmin } = require('../controllers/admin.controller');



router.get('/check', protectRoute, requireAdmin, checkAdmin);
// Sample route to get all users
router.post('/songs', protectRoute, requireAdmin, createSong);
router.delete('/songs/:id', protectRoute, requireAdmin, deleteSong);

router.post('/albums', protectRoute, requireAdmin, createAlbum);
router.delete('/albums/:id', protectRoute, requireAdmin, deleteAlbum);


module.exports = router;