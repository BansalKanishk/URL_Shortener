import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation after successful login

const UserLogin = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();

  // Handle Login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!email || !password) {
      setLoginStatus("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setLoginStatus("Login successful!");
        setIsLoggedIn(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setLoginStatus("Error: " + data.error);
      }
    } catch (error) {
      setLoginStatus("Error logging in. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container bg-white p-5 rounded shadow-lg" style={{ maxWidth: '400px' }}>
        <h2 className="text-center text-primary mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 py-2 mb-3">
            Login
          </button>
        </form>

        {loginStatus && (
          <div
            className={`alert ${loginStatus.includes('Error') ? 'alert-danger' : 'alert-success'}`}
            role="alert"
          >
            {loginStatus}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserLogin;
