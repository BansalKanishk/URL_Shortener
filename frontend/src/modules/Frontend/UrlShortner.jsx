import React, { useState } from "react";

const UrlShortener = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false); // For copying URL feedback

  // Create Account States
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState(""); // Feedback for registration

  // Handle URL shortening
  const handleShortenUrl = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ longUrl }),
      });

      const data = await response.json();

      if (data.shortUrl) {
        setShortUrl(data.shortUrl);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Handle Create Account form submission
  const handleCreateAccount = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!username || !email || !password) {
      setRegistrationStatus("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setRegistrationStatus("Account created successfully!");
      } else {
        setRegistrationStatus("Error: " + data.error);
      }
    } catch (error) {
      setRegistrationStatus("Error creating account. Please try again.");
      console.error("Error:", error);
    }
  };

  // Function to handle copying the short URL to the clipboard
  const handleCopyToClipboard = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl)
        .then(() => {
          setCopied(true); // Update state to show that the URL was copied
          setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
        })
        .catch((error) => {
          console.error("Failed to copy URL: ", error);
        });
    }
  };

  return (
    <div className="container text-center mt-5 bg-white p-5 rounded">
      <h2 className="text-2xl font-bold text-black">URL Shortener</h2>
      
      {/* Create Account Form */}
      <div className="mt-5">
        <h3 className="font-bold text-black">Create Account</h3>
        <form onSubmit={handleCreateAccount} className="mt-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control mb-3"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control mb-3"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control mb-3"
          />
          <button type="submit" className="btn-primary px-4 py-2">
            Create Account
          </button>
        </form>
        {registrationStatus && (
          <p className="mt-3">{registrationStatus}</p>
        )}
      </div>

      {/* URL Shortener Section */}
      <h3 className="font-bold text-black mt-5">Paste the URL to be shortened</h3>
      <div className="m-3 p-4 w-100">
        <input
          type="text"
          placeholder="Enter your long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="form-control"
        />
      </div>
      <button
        onClick={handleShortenUrl}
        className="btn-primary px-4 py-2"
      >
        Shorten URL
      </button>
      {shortUrl && (
        <div className="mt-4">
          <p className="text-lg">
            Short URL:
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex"
            >
              {shortUrl}
            </a>
          </p>
          {/* Copy Button */}
          <button
            onClick={handleCopyToClipboard}
            className="btn-primary px-4 py-2 mt-3"
          >
            {copied ? "Copied!" : "Copy to Clipboard"}
          </button>
        </div>
      )}
    </div>
  );
};

export default UrlShortener;
