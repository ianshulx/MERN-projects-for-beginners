const express = require('express');
const { getAllSongs, getSongsForYou, getFeaturedSongs, getTrendingSongs, getSingleSong } = require('../controllers/song.controller');
const { protectRoute, requireAdmin } = require('../middleware/auth.middleware');
const router = express.Router();

// Sample route to get all users
router.get('/', protectRoute, requireAdmin, getAllSongs);
router.get('/featured', getFeaturedSongs);
router.get('/made-for-you', getSongsForYou);
router.get('/trending', getTrendingSongs);
router.get('/single', getSingleSong);


module.exports = router;