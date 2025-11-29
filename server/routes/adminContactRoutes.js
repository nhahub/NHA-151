const express = require('express');
const router = express.Router();
const { getAllMessages, markAsRead } = require('../controllers/contactController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', protect, admin, getAllMessages);
router.patch('/:id/read', protect, admin, markAsRead);

module.exports = router;
