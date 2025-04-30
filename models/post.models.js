const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // User se link hoga post
    required: true
  },
  username: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    trim: true,
    maxlength: 500, // Caption ki max length 500 characters
  },
  hashtags: [{
    type: String,
    trim: true
  }],
  imageUrl: {
    type: String, // Image ka URL store karne ke liye
    required: false
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true 
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
