const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const postController = require('../controllers/postController');

const router = express.Router();

// Create a new post
router.post('/newpost',authenticateToken, postController.createPost);

// Get all posts
router.get('/allpost', authenticateToken, postController.getAllPosts);

// Add the following line in your routes file (e.g., routes/postRoutes.js)

// Delete a post by ID
router.delete('/deletepost/:postId', authenticateToken, postController.deletePost);


module.exports = router;
