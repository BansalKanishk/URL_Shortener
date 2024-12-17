const express = require('express');
const cors = require('cors');
const shortid = require('shortid');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory URL store
const urlDatabase = {};
// In-memory User store (for simplicity, this will be replaced with a real database in production)
const users = [];

// Base URL for shortened URLs
const baseUrl = `http://localhost:${PORT}`;

// Endpoint to shorten URL
app.post('/api/shorten', (req, res) => {
  let { longUrl } = req.body;

  // Check if longUrl starts with 'http://' or 'https://'
  if (!/^https?:\/\//i.test(longUrl)) {
    longUrl = `http://${longUrl}`;
  }

  // Generate short code
  const urlCode = shortid.generate();

  // Create short URL
  const shortUrl = `${baseUrl}/${urlCode}`;

  // Store the URL mapping
  urlDatabase[urlCode] = longUrl;

  // Return the short URL
  res.json({ shortUrl });
});

// Endpoint to redirect to the original URL
app.get('/:code', (req, res) => {
  const { code } = req.params;
  const longUrl = urlDatabase[code];

  if (longUrl) {
    // Redirect to the original URL
    res.redirect(longUrl);
  } else {
    res.status(404).json({ error: 'No URL found' });
  }
});

// Root endpoint (optional)
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to URL Shortener API' });
});

// Endpoint for user registration
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;

  // Basic validation
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Please fill out all fields." });
  }

  // Check if email already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ error: "Email already in use." });
  }

  // Save user to "database"
  const newUser = { username, email, password }; // In a real app, you should hash the password!
  users.push(newUser);
  console.log('users',users)

  return res.status(200).json({ success: true, message: "Account created successfully!" });
});


// Endpoint to handle login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    // User authenticated successfully
    res.json({ success: true });
  } else {
    // Authentication failed
    res.json({ success: false, error: 'Invalid credentials' });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
