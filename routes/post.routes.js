const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controllers');
const verifyToken = require('../middlewares/verifyToken');

// 🔐 Protected Routes
router.post('/create', verifyToken, postController.createPost);
router.get('/', verifyToken, postController.getUserPosts);
router.get('/single/:id', verifyToken, postController.getSinglePost);
router.delete('/delete/:id', verifyToken, postController.deletePost);
router.put('/update/:id', verifyToken, postController.updatePost);               // 🛠️ Update Post
router.get('/search', verifyToken, postController.searchPostsByCaption);         // 🔍 Search Post by Caption

module.exports = router;
