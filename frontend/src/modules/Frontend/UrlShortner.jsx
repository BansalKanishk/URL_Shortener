import React, { useState } from "react";
import UserLogin from "./UserLogin";

const UrlShortener = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  // Handle URL shortening
  const handleShortenUrl = async () => {
    // if (!longUrl) {
    //   alert("Please enter a valid URL.");
    //   return;
    // }

    try {
      const response = await fetch("http://localhost:5001/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ longUrl }),
      });

      const data = await response.json();

      if (data.shortUrl) {
        setShortUrl(data.shortUrl);
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error processing your request.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="container text-center p-5 rounded shadow-lg" style={{ maxWidth: '500px' }}>
        <h2 className="text-white mb-4">URL Shortener</h2>
          <div>
            <h3 className="text-white font-bold mb-4">Paste the URL to be shortened</h3>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Enter your long URL"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                className="form-control"
              />
            </div>
            <button onClick={handleShortenUrl} className="btn btn-success w-100 py-2 mb-3">
              Shorten URL
            </button>

            {shortUrl && (
              <div className="mt-4">
                <p className="text-white">
                  Short URL:{" "}
                  <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-success">
                    {shortUrl}
                  </a>
                </p>
              </div>
            )}
          </div>
      </div>
    </div>
  );
};

export default UrlShortener;
