const connection = require('../database/db');

// Register User
exports.registerUser = (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Please fill out all fields.' });
  }

  const checkEmailQuery = 'SELECT * FROM USERS WHERE email = ?';
  connection.query(checkEmailQuery, [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error.' });
    if (results.length > 0) return res.status(400).json({ error: 'Email already exists' });

    const insertUserQuery = 'INSERT INTO USERS (username, email, password) VALUES (?, ?, ?)';
    connection.query(insertUserQuery, [username, email, password], (err) => {
      if (err) return res.status(500).json({ message: 'Database error.' });
      res.status(200).json({ success: true, message: 'Account created successfully!' });
    });
  });
};

// Login User
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  const findUserQuery = 'SELECT * FROM USERS WHERE email = ? AND password = ?';
  connection.query(findUserQuery, [email, password], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error.' });
    if (results.length === 0) return res.status(400).json({ error: 'Invalid credentials' });

    res.json({ success: true, message: 'Login successful' });
  });
};
