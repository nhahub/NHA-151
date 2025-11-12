// Quick script to list users in MongoDB
require('dotenv').config();
const mongoose = require('mongoose');

async function listUsers() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    const User = require('../models/userModel');
    const users = await User.find().select('name email isAdmin role');

    if (users.length === 0) {
      console.log('❌ No users found in database');
      console.log('\n📌 To seed test data, run:');
      console.log('   npm run seed:intelligent');
      process.exit(0);
    }

    console.log('📋 Users in Database:\n');
    console.log(
      JSON.stringify(
        users.map((u) => ({
          name: u.name,
          email: u.email,
          role: u.role || 'user',
          isAdmin: u.isAdmin,
        })),
        null,
        2,
      ),
    );

    console.log('\n✨ Login with any of these emails + password from seed script');

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

listUsers();
