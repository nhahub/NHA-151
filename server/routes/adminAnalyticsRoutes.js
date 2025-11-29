const express = require('express');
const router = express.Router();
const { getOverview } = require('../controllers/adminAnalyticsController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/overview', protect, admin, getOverview);

module.exports = router;
