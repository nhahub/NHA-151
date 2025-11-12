// Script to reset admin password to a known plain text value
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const NEW_PASSWORD = 'Admin@Secure123!';
const ADMIN_EMAIL = 'admin.plants@example.com';

async function resetAdminPassword() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    const User = require('../models/userModel');
    
    // Find the admin user
    const admin = await User.findOne({ email: ADMIN_EMAIL });
    
    if (!admin) {
      console.log(`❌ No user found with email: ${ADMIN_EMAIL}`);
      process.exit(1);
    }

    console.log(`📝 Resetting password for: ${admin.name} (${admin.email})`);
    console.log(`🔐 New password: ${NEW_PASSWORD}\n`);

    // Update password (Mongoose pre-save hook will hash it)
    admin.password = NEW_PASSWORD;
    await admin.save();

    console.log('✅ Password reset successful!\n');
    console.log('📌 You can now login with:');
    console.log(`   Email: ${ADMIN_EMAIL}`);
    console.log(`   Password: ${NEW_PASSWORD}\n`);

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

resetAdminPassword();
