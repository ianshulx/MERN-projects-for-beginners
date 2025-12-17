const express = require('express');
const { NewUser } = require('../controllers/auth.controller');
const router = express.Router();

// Sample route to get all users
router.post('/callback', NewUser);


module.exports = router;