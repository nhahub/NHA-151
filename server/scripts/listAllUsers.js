const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });

const User = require('../models/userModel');

async function listUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    const users = await User.find({}, 'name email isAdmin role').lean();
    
    console.log('📋 All Users in Database:\n');
    console.log('─'.repeat(80));
    
    users.forEach((user, index) => {
      console.log(`${index + 1}. Name: ${user.name}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Is Admin: ${user.isAdmin ? '✅ YES' : '❌ NO'}`);
      console.log('');
    });

    console.log('─'.repeat(80));
    console.log(`\n📊 Total users: ${users.length}`);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

listUsers();
