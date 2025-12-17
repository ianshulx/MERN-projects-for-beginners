const express = require('express');
const { getStats } = require('../controllers/stats.controller');
const router = express.Router();
const { protectRoute, requireAdmin } = require('../middleware/auth.middleware');

// Sample route to get all users
router.get('/', protectRoute, requireAdmin, getStats);


module.exports = router;