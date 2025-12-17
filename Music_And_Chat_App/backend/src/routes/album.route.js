const express = require('express');
const { AllAlbums, AllAlbumsById } = require('../controllers/album.controller');
const router = express.Router();

// Sample route to get all users
router.get('/', AllAlbums);
router.get('/:albumId', AllAlbumsById);


module.exports = router;