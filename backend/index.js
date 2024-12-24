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
const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'kanishk',
  password: 'test1234',
  database: 'dblocal'
});



//connect mysql
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// create table
connection.connect(function(err) {
  try{
    if (err) throw err;

    var sql = `
    CREATE TABLE IF NOT EXISTS USERS (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
    `;
        connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  } catch(error){
    console.error("Something went wrong.Table not created!")
  }
});

// In-memory User store (for simplicity, this will be replaced with a real database in production)
const users = [];




// Base URL for shortened URLs
const baseUrl = `http://localhost:${PORT}`;

// Endpoint to shorten URL
app.post('/api/shorten', (req, res) => {
  try{
    let { longUrl } = req.body;

    if(longUrl.length>100){
      return res.status(400).json({ error: 'The URL cannot be longer than 100 characters.' });
    }
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
  }
  catch(error){
    res.status(500).json({
      message: "Something went wrong. Try again!"
    })
  }
});

// Endpoint to redirect to the original URL
app.get('/:code', (req, res) => {
  const { code } = req.params;
  const longUrl = urlDatabase[code];
try{
  if (longUrl) {
    // Redirect to the original URL
    res.redirect(longUrl);
  } 
  else {
    res.status(404).json({ error: 'No URL found' });
  }
}
catch(error){
  res.status(500).json({
    message: "Something went wrong. Try again!"
  })
}
});

// Root endpoint (optional)
app.get('/', (req, res) => {
  try{
  res.status(200).json({ message: 'Welcome to URL Shortener API' });
  }
  catch(error){
    res.status(500).json({
      message: "Something went wrong. Try again!"
    })
  }
});

// Endpoint for user registration
app.post('/api/register', (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Please fill out all fields." });
    }

    // Check if email already exists in the database
    const checkEmailQuery = `SELECT * FROM USERS WHERE email = ?`;
    connection.query(checkEmailQuery, [email], (err, results) => {
      if (err) {
        console.error("Error checking email:", err);
        return res.status(500).json({ message: "Database error." });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: "Email already exists" });
      }

      // Insert new user into the database
      const insertUserQuery = `
        INSERT INTO USERS (username, email, password)
        VALUES (?, ?, ?)
      `;
      connection.query(insertUserQuery, [username, email, password], (err, result) => {
        if (err) {
          console.error("Error inserting user:", err);
          return res.status(500).json({ message: "Database error." });
        }

        return res.status(200).json({ success: true, message: "Account created successfully!" });
      });
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Something went wrong! Try again!" });
  }
});



// Endpoint to handle login
app.post('/api/login', (req, res) => {
  try{
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
  }
  catch(error){
    res.status(500).json({
      message: "Something went wrong! Try again!"
    })
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
