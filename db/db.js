const dotenv = require('dotenv');
const mongoose = require('mongoose');


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Atlas se juda gaya 🚀');
  } catch (error) {
    console.error('❌ Galti ho gayi bhai:', error.message);
    process.exit(1); // Forcefully exit if connection fails
  }
};

module.exports = connectDB;

