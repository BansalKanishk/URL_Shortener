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
    <div className="header-container d-flex justify-content-between align-items-center p-3" style={{'backgroundColor':'#585858'}}>
      <div className="logo text-white cursor-pointer" onClick={gotoHome}>
      <h1 className="mb-0" style={{ fontWeight: '600' }}>URL Shortener</h1>
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
            <button onClick={goToLoginPage} className="btn btn-primary mx-2">
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
