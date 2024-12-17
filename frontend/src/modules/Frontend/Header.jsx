import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [user, setUser] = useState(null); // State to hold user information (if logged in)
  const navigate = useNavigate(); // For navigation


  // Function to handle logout
  const handleLogout = () => {
    setUser(null); // Clear user data (simulating logout)
    navigate("/"); // Navigate to homepage after logout
  };
  const gotoHome =() =>{
    navigate("/");
  }

  // Function to navigate to login page
  const goToLoginPage = () => {
    navigate("/login"); // Navigate to login page
  };

  // Function to navigate to register page
  const goToRegisterPage = () => {
    navigate("/register"); // Navigate to registration page
  };

  return (
    <div className="header-container bg-dark d-flex justify-content-between p-3 m-2">
      <div className="logo text-white">
        <h1 onClick={gotoHome}>URL Shortener</h1>
      </div>

      <div className="user-actions d-flex align-items-center">
        {user ? (
          <>
            <span className="username">{user.name}</span>
            <img
              src={user.icon}
              alt="User Icon"
              className="user-icon rounded-circle ml-2"
              style={{ width: "30px", height: "30px" }}
            />
            <button onClick={handleLogout} className="btn btn-danger ml-3">
              Logout
            </button>
          </>
        ) : (
          <>
            <button onClick={goToLoginPage} className="btn btn-primary mr-3" style={{'marginRight':'12px'}}>
              Login
            </button>
            <button onClick={goToRegisterPage} className="btn btn-warning">
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
}
