import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header({isLoggedIn, setIsLoggedIn}) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // For navigation
  const [loadingSpinner, setLoadingSpinner] = useState(false);

   // Function to fetch the logged-in user's data
   const getUser = async () => {
    if (!isLoggedIn) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      // const username = response.users.map(user => user.username);

      if (data.success && data.user) {
        setUser(data.user);  // Set user data from response
      } else {
        // alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error processing your request.");
    }
  };

  useEffect(() => {
    getUser();
  }, [isLoggedIn]); 

  // const handleLogout = () => {
  //   setUser(null);
  //   navigate("/logout");
  //   setIsLoggedIn(false);
  // };
  const handleLogout = () => {
    setLoadingSpinner(true);
    setTimeout(() => {
      setUser(null);
      setIsLoggedIn(false);
      setLoadingSpinner(false);
      window.location.reload(); 
    }, 2000)
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
    <>
    {loadingSpinner && (
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
    <div className="header-container d-flex justify-content-between align-items-center p-3" style={{'backgroundColor':'#585858'}}>
      <div className="logo text-white cursor-pointer" onClick={gotoHome}>
      <h1 className="mb-0" style={{ fontWeight: '600' }}>URL Shortener</h1>
      </div>

      <div className="user-actions d-flex align-items-center">
        {isLoggedIn ? (
          <>
            {/* <span className="username">{user.name}</span> */}
           
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
    </>
  );
}
