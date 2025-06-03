const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

async function seedAdmin() {
  await mongoose.connect(process.env.MONGO_URI);
  const admin = await User.findOne({ email: 'admin@saccosmart.com' });
  if (!admin) {
    const hash = await bcrypt.hash('12345678', 10);
    await User.create({
      name: 'Admin',
      email: 'admin@saccosmart.com',
      password: hash,
      role: 'admin'
    });
    console.log('Admin user created');
  } else {
    console.log('Admin user already exists');
  }
  mongoose.disconnect();
}
seedAdmin();
