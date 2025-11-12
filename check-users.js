require('dotenv').config({ path: './server/.env' });
const mongoose = require('mongoose');

async function checkUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce');
    console.log('✅ Connected to MongoDB');

    const User = require('./server/models/userModel');
    const users = await User.find().select('name email isAdmin role');

    console.log('\n📋 Users in Database:\n');
    users.forEach((user, idx) => {
      console.log(`${idx + 1}. Name: ${user.name}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role || 'user'}`);
      console.log(`   Admin: ${user.isAdmin ? 'Yes' : 'No'}`);
      console.log('');
    });

    console.log(`\n📊 Total users: ${users.length}`);
    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkUsers();
