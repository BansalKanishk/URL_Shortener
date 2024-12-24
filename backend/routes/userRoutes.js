const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

//user-related routes
router.post('/api/register', registerUser); // Register
router.post('/api/login', loginUser);       // Login

module.exports = router;
