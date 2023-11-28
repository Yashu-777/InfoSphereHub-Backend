const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/newpost',authenticateToken, postController.createPost);
router.get('/allpost', authenticateToken, postController.getAllPosts);
router.delete('/deletepost/:postId', authenticateToken, postController.deletePost);
router.get('/blogcount',authenticateToken,postController.getBlogCount);

module.exports = router;
