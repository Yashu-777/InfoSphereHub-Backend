const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const generateAccessToken = (user) => {
   // console.log("generator : ",user);
    return jwt.sign(user, accessTokenSecret, { expiresIn: '600s' });
  };
  

const authController = {
  register: async (req, res) => {
    // ... (your existing register logic)
    try {
        const { username, password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword,email });
        await user.save();
        res.status(201).send('User registered successfully');
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    },

  login: async (req, res) => {
    // ... (your existing login logic)
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
    // ... (your existing refresh token logic)
    const refreshToken = req.body.token;
  if (!refreshToken) return res.sendStatus(401);

  jwt.verify(refreshToken, refreshTokenSecret , (err, user) => {
    if (err) return res.sendStatus(403);

    const accessToken = generateAccessToken({ username: user.username });
    //console.log("refresherrrrr : ",user);
    res.json({ accessToken });
  });
  },

  protectedRoute: (req, res) => {
    // ... (your existing protected route logic)
    res.json({ message: 'You have access to the protected route!', user: req.user });
  },
};

module.exports = authController;
