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
    <div>
        <div className="container text-center mt-5 bg-white p-5 rounded">
        <h2 className="text-2xl font-bold text-black">Create Account</h2>
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
            <button type="submit" className="btn btn-primary px-4 py-2">
            Sign Up
            </button>
        </form>
        {registrationStatus && <p className="mt-3">{registrationStatus}</p>}
        </div>
    </div>
  );
};

export default UserRegistration;
