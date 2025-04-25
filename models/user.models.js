const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true 
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    lowercase: true 
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{10}$/, 'Phone number galat hai'] 
  },
  password: {
    type: String,
    required: true,
    minlength: 6 
  },
  confirmPassword: {
    type: String,
    required: [true, 'Confirm Password dena zaroori hai'],
    validate: {
      validator: function(value) {
        return value === this.password; 
      },
      message: 'Passwords match nahi karte 😥'
    },
    select: false // 👈 Ye magic line
  },
  role: {
    type: String,
    enum: ['student', 'professor', 'investor'], 
    required: true
  }
});

// 🔥 Password ko hash karenge aur confirmPassword hata denge
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // Agar password change nahi hua to skip
  
  this.password = await bcrypt.hash(this.password, 12); // password ko strong hash karna
  this.confirmPassword = undefined; // confirmPassword ko database me nahi bhejna
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
