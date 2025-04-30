const Post = require('../models/post.models');
const User = require('../models/user.models');
const mongoose = require('mongoose');

// 🎯 Create Post
exports.createPost = async (req, res) => {
  try {
    const { username, caption, hashtags, imageUrl } = req.body;
    const userId = req.user.id;

    if (!caption) {
      return res.status(400).json({ message: 'Caption is required' });
    }

    const newPost = new Post({
      user: userId,
      username,
      caption,
      hashtags,
      imageUrl
    });

    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// 📦 Get All Posts of the Current User
exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ message: 'Error fetching posts' });
  }
};

// 🔍 Get Single Post by ID
exports.getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (err) {
    console.error('Error fetching post:', err);
    res.status(500).json({ message: 'Error fetching post' });
  }
};

// 🗑️ Delete Post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found for deletion' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ message: 'Error deleting post' });
  }
};

// 🛠️ Update Post
exports.updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found for update' });
    }

    res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({ message: 'Error updating post' });
  }
};

// 🔍 Search Posts by Caption
exports.searchPostsByCaption = async (req, res) => {
  try {
    const { caption } = req.query;

    if (!caption) {
      return res.status(400).json({ message: 'Caption keyword is required for search' });
    }

    const posts = await Post.find({ caption: { $regex: caption, $options: 'i' } });
    res.status(200).json(posts);
  } catch (err) {
    console.error('Error searching posts:', err);
    res.status(500).json({ message: 'Error searching posts' });
  }
};
