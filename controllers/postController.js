const Post = require('../models/Post');
const User = require('../models/User');

// Controller for creating a new post
async function createPost(req, res) {
  const { title, content} = req.body;
  const userTemp = req.user.username;
/*   console.log(title);
  console.log(content);
  console.log(userTemp); */
  try {
    // Find the user by username
    
    const user = await User.findOne({ username:userTemp });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new post associated with the user
    const post = new Post({
      title,
      content,
      author: user,
    });

    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Controller for getting all posts
async function getAllPosts(req, res) {
  try {
    const posts = await Post.find().populate('author', 'username');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createPost,
  getAllPosts,
};
