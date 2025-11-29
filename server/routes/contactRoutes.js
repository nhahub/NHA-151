const express = require('express');
const router = express.Router();
const { createMessage } = require('../controllers/contactController');
const optionalAuth = require('../middleware/optionalAuth');

// Public endpoint that optionally associates a logged-in user
router.post('/', optionalAuth, createMessage);

module.exports = router;
