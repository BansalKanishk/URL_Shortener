require('dotenv').config(); // For environment variables
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const urlRoutes = require('./routes/urlRoutes');
const userRoutes = require('./routes/userRoutes');

// Use Routes
app.use(urlRoutes);
app.use(userRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
