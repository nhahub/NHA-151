const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Reset rate limiter by just killing the process so it resets on restart
console.log('📌 To reset rate limiter, restart the backend server...');
console.log('🛑 The rate limiter stores requests in memory - restarting clears it.');
console.log('\nPress Ctrl+C in the backend terminal and run: npm run dev');
