import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation after successful login

const UserLogin = ({isLoggedIn, setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading]= useState(false);


  // Handle Login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Basic form validation
    if (!email || !password) {
      setLoginStatus("Please fill out all fields.");
      return;
    }
  
    try {
      setIsLoading(true);
      console.log('is',isLoading)
      const response = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        setLoginStatus("Login successful!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setLoginStatus("Error: " + data.error);
        setIsLoggedIn(false);
      }
    } catch (error) {
      setLoginStatus("Error logging in. Please try again.");
      console.error("Error:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false); 

      }, 2000);
    }
  };

  return (
    <>
    {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
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

        {/* {loginStatus && (
          <div
            className={`alert ${loginStatus.includes('Error') ? 'alert-danger' : 'alert-success'}`}
            role="alert"
          >
            {loginStatus}
          </div>
        )} */}
      </div>
    </div>
    </>

  );
};

export default UserLogin;
