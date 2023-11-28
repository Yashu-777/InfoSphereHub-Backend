const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Post = require('../models/Post');
const Task = require('../models/Task');
require('dotenv').config();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const generateAccessToken = (user) => {
   // console.log("generator : ",user);
    return jwt.sign(user, accessTokenSecret, { expiresIn: '600s' });
  };
  

const authController = {
  register: async (req, res) => {
    try {
      const { username, password, email } = req.body;
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword, email });
      await user.save();
      res.status(201).send('User registered successfully');
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  },
  
  login: async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        /* console.log(username);
        console.log(user); */
        if (user && (await bcrypt.compare(password, user.password))) {
          const accessToken = generateAccessToken({ username });
          const refreshToken = jwt.sign({ username }, refreshTokenSecret ,{ expiresIn: '1d' });
          res.json({ accessToken, refreshToken,username });
        } else {
          res.status(401).send('Invalid username or password');
        }
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
  },

  refreshToken: (req, res) => {
    const refreshToken = req.body.token;
  if (!refreshToken) return res.sendStatus(401);

  jwt.verify(refreshToken, refreshTokenSecret , (err, user) => {
    if (err) return res.sendStatus(403);

    const accessToken = generateAccessToken({ username: user.username });
    //console.log("refresherrrrr : ",user);
    res.json({ accessToken });
  });
  },

  getUserDetails: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.user.username });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({
        username: user.username,
        email: user.email,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  updatePassword: async (req, res) => {
    try {
      const { username, newPassword,oldPassword } = req.body;

      const user= await User.findOne({username});
      if (!(await bcrypt.compare(oldPassword, user.password))){
        //console.log('password mismatch')
        return res.status(401).json({message: 'Incorrect password'});
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const updatedUser = await User.findOneAndUpdate(
        { username },
        { password: hashedPassword },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      //console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  
deleteUser: async (req, res) => {
  try {
    const { username } = req.user;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete associated blog posts,tasks
    await Post.deleteMany({ author: user._id });
    await Task.deleteMany({username:username});
    // Delete the user
    await user.deleteOne();

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
},

  protectedRoute: (req, res) => {
    res.json({ message: 'You have access to the protected route!', user: req.user });
  },
};

module.exports = authController;
