/**
 * Health check routes
 * Provides endpoints for monitoring backend availability and readiness
 */
const express = require('express');

const router = express.Router();

/**
 * GET /api/health
 * Simple health check endpoint used by frontend to verify backend availability
 * No authentication required (public endpoint)
 */
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Backend is healthy and operational',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

/**
 * GET /api/health/ready
 * Readiness check — can include DB connection verification
 * Used to determine if backend is ready to accept traffic
 */
router.get('/ready', async (req, res) => {
  try {
    // Could add DB connectivity check here
    // const db = require('../config/db');
    // await db.checkConnection(); // if method exists

    res.status(200).json({
      status: 'ready',
      message: 'Backend is ready to serve traffic',
      timestamp: new Date().toISOString(),
      checksPerformed: ['server-running', 'middleware-loaded'],
    });
  } catch (err) {
    res.status(503).json({
      status: 'not-ready',
      message: 'Backend is not ready (dependency check failed)',
      error: err.message,
      timestamp: new Date().toISOString(),
    });
  }
});

module.exports = router;
