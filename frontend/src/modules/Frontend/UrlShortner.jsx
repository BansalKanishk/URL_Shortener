import React, { useState } from "react";
import Header from "./Header";

const UrlShortener = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  // Handle URL shortening
  const handleShortenUrl = async () => {
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
    }
  };

  return (
    <div>
      {/* <div>
        <Header/>
      </div> */}
      <div className="container text-center mt-5 bg-black p-5 rounded">
        <h2 className="text-2xl font-bold text-white">URL Shortener</h2>        
        <h3 className="font-bold text-white mt-5">Paste the URL to be shortened</h3>
        <div className="m-3 p-4 w-100">
          <input
            type="text"
            placeholder="Enter your long URL"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="form-control"
          />
        </div>
        <button onClick={handleShortenUrl} className="btn btn-success px-4 py-2">
          Shorten URL
        </button>

        {shortUrl && (
          <div className="mt-4">
            <p className="text-lg text-white">
              Short URL : 
              <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                {shortUrl}
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlShortener;
