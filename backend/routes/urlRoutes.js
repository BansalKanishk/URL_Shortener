const express = require('express');
const { baseurl,shortenUrl, redirectUrl } = require('../controllers/urlController');

const router = express.Router();

router.get('/',baseurl)
router.post('/api/shorten', shortenUrl); // Shorten URL
router.get('/:code', redirectUrl);      // Redirect to original URL

module.exports = router;
