const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });

const User = require('../models/userModel');

async function resetCustomerPassword() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    // Find user and load document
    const user = await User.findOne({ email: 'customer1@example.com' });

    if (!user) {
      console.error('❌ Customer not found');
      process.exit(1);
    }

    // Set password (triggers pre-save hook for hashing)
    user.password = 'Customer@123!';
    await user.save();

    console.log('✅ Password reset successful!\n');
    console.log('📌 You can now login with:');
    console.log(`   Email: ${user.email}`);
    console.log(`   Name: ${user.name}`);
    console.log(`   Password: Customer@123!`);
    console.log(`   Role: ${user.role}`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

resetCustomerPassword();
