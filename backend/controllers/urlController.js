const shortid = require('shortid');
require('dotenv').config();

const baseUrl = process.env.BASE_URL ;
// In-memory URL store (temporary)
const urlDatabase = {};

// Root endpoint 
exports.baseurl= (req, res) => {
  try{
  res.status(200).json({ message: 'Welcome to URL Shortener API' });
  }
  catch(error){
    res.status(500).json({
      message: "Something went wrong. Try again!"
    })
  }
};

// Shorten URL logic
exports.shortenUrl = (req, res) => {
  try {
    let { longUrl } = req.body;

    if (longUrl.length > 100) {
      return res.status(400).json({ error: 'The URL cannot be longer than 100 characters.' });
    }

    // Ensure longUrl starts with 'http://` or `https://`
    if (!/^https?:\/\//i.test(longUrl)) {
      longUrl = `http://${longUrl}`;
    }

    const urlCode = shortid.generate();
    const shortUrl = `${baseUrl}/${urlCode}`;

    urlDatabase[urlCode] = longUrl;

    res.json({ shortUrl });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Try again!' });
  }
};

// Redirect to original URL
exports.redirectUrl = (req, res) => {
  const { code } = req.params;
  const longUrl = urlDatabase[code];

  if (longUrl) {
    res.redirect(longUrl);
  } else {
    res.status(404).json({ error: 'No URL found' });
  }
};
