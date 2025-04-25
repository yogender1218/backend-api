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
    maxlength: 500, // Caption ka length limit
  },
  hashtags: [{
    type: String,
    trim: true
  }],
  imageUrl: {
    type: String, // Jo bhi image ka URL ya server path hoga
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
  timestamps: true // createdAt aur updatedAt apne aap create hoga
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
