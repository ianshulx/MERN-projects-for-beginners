const express = require('express');
const { protectRoute, requireAdmin } = require('../middleware/auth.middleware');
const { getAllUser, getMessage } = require('../controllers/user.controller');
// const { getAllUser } = require('../controllers/user.controller');
// const { getMessages } = require('../controllers/message.controller');
const router = express.Router();

// Sample route to get all users
router.get('/', protectRoute, getAllUser);
router.get('/message/:userId', protectRoute, getMessage);


module.exports = router;