const express = require('express');
const authController = require('../controllers/authController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/token', authController.refreshToken);
router.get('/protected', authenticateToken, authController.protectedRoute);
router.post('/updatepassword', authenticateToken, authController.updatePassword);
router.get('/userdetails', authenticateToken, authController.getUserDetails);
router.delete('/deleteuser', authenticateToken, authController.deleteUser); 

module.exports = router;
