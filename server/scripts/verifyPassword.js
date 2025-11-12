const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });

const User = require('../models/userModel');

async function verifyPassword() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    const user = await User.findOne({ email: 'customer1@example.com' }).select('+password');
    
    if (!user) {
      console.error('❌ User not found');
      process.exit(1);
    }

    console.log('👤 User:', user.name);
    console.log('📧 Email:', user.email);
    console.log('🔐 Password hash:', user.password);
    console.log('\nTesting password match...');
    
    const isMatch = await user.matchPassword('Customer@123!');
    console.log('Password match result:', isMatch ? '✅ MATCH' : '❌ NO MATCH');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

verifyPassword();
