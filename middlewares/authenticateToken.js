const jwt = require('jsonwebtoken');
require('dotenv').config();
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

  if (!token) {
    console.log('No token provided');
    return res.sendStatus(401);
  }

  jwt.verify(token.split(' ')[1], accessTokenSecret , (err, decoded) => {
    if (err) {
      console.log('Token verification error:', err);
      return res.sendStatus(403);
    }
    console.log('Token verified successfully');
    req.user = decoded;
    next();
  });
};

module.exports = authenticateToken;
