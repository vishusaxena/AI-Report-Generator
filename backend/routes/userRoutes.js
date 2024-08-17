const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

// Route for getting the user's profile (protected route)
router.get('/profile', protect, getUserProfile);

module.exports = router;
