import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header({isLoggedIn, setIsLoggedIn,userEmail}) {
  const [user, setUser] = useState([]);
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
      

      if (data) {
        // const usernames = data.users.map(user => user.username);
        const username = data.users
        .filter(user => user.email === userEmail)
        .map(user => user.username)[0];

        setUser(username);  // Set user data from response
        console.log("AAdddsd",user)
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
  console.log("isLoggedIn",isLoggedIn)

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
            <div className="text-black px-4 d-flex bg-white p-2 rounded-5">{user}
            <span class="material-symbols-outlined" style={{ marginLeft: '8px' }}>
            face
            </span>
            </div>
            <button type="button" onClick={handleLogout} className="btn btn-danger px-4 rounded-5" style={{ marginLeft: '8px' , padding:'8px'}}>
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
