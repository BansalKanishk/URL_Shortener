import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserRegistration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState("");
  const navigate = useNavigate();

  // Handle Create Account form submission
  const handleCreateAccount = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!username || !email || !password) {
      setRegistrationStatus("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setRegistrationStatus("Account created successfully!");
        navigate("/");
      } else {
        setRegistrationStatus("Error: " + data.error);
      }
    } catch (error) {
      setRegistrationStatus("Error creating account. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container bg-white p-5 rounded shadow-lg" style={{ maxWidth: '400px' }}>
        <h2 className="text-center text-primary mb-4">Create Account</h2>
        <form onSubmit={handleCreateAccount}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
            />
          </div>
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
            Sign Up
          </button>
        </form>

        {registrationStatus && (
          <div className={`alert ${registrationStatus.includes('Error') ? 'alert-danger' : 'alert-success'}`} role="alert">
            {registrationStatus}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserRegistration;
