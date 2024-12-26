const express = require('express');
const { registerUser, loginUser, fetchUser } = require('../controllers/userController');

const router = express.Router();

//user-related routes
router.post('/api/register', registerUser); // Register
router.post('/api/login', loginUser);       // Login
router.get('/users', fetchUser); //fetch user

module.exports = router;
