import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation after successful login

const UserLogin = ({setIsLoggedIn}) => {
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
    <div>
        <div className="container text-center mt-5 bg-white p-5 rounded">
        <h2 className="text-2xl font-bold text-black">Login</h2>
        <form onSubmit={handleLogin} className="mt-4">
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
            Login
            </button>
        </form>
        {loginStatus && <p className="mt-3">{loginStatus}</p>}
        </div>
    </div>

  );
};

export default UserLogin;
