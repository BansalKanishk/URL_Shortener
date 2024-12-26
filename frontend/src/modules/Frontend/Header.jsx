import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header({isLoggedIn}) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // For navigation

   // Function to fetch the logged-in user's data
   const getUser = async () => {
    if (!isLoggedIn) {
      return; // If not logged in, do not fetch user data
    }

    try {
      const response = await fetch("http://localhost:5001/users", { // Assuming '/me' for logged-in user's data
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Add Authorization if you use tokens
          // Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      console.log("User Data: ", data);

      if (data.success && data.user) {
        setUser(data.user);  // Set user data from response
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error processing your request.");
    }
  };

  useEffect(() => {
    getUser();
  }, [isLoggedIn]); 

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };
  const gotoHome =() =>{
    navigate("/");
  }

  const goToLoginPage = () => {
    navigate("/login");
  };

  const goToRegisterPage = () => {
    navigate("/register");
  };

  return (
    <div className="header-container d-flex justify-content-between align-items-center p-3" style={{'backgroundColor':'#585858'}}>
      <div className="logo text-white cursor-pointer" onClick={gotoHome}>
      <h1 className="mb-0" style={{ fontWeight: '600' }}>URL Shortener</h1>
      </div>

      <div className="user-actions d-flex align-items-center">
        {isLoggedIn ? (
          <>
            {/* <span className="username">{user.name}</span> */}
            {/* <img
              src={user.icon}
              alt="User Icon"
              className="user-icon rounded-circle ml-2"
              style={{ width: "30px", height: "30px" }}
            /> */}
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
