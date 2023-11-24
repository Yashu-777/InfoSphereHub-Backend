const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    //type:String,
    required: true,
  },
}, {
  collection: 'Posts', // Specify the collection name
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
