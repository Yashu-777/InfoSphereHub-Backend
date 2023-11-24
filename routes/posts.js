const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const postController = require('../controllers/postController');

const router = express.Router();

// Create a new post
router.post('/newpost',authenticateToken, postController.createPost);

// Get all posts
router.get('/allpost', authenticateToken, postController.getAllPosts);

module.exports = router;
