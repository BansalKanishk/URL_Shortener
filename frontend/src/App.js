import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UrlShortener from './modules/Frontend/UrlShortner';
import UserRegistration from './modules/Frontend/UserRegistration';
import UserLogin from './modules/Frontend/UserLogin';
import Header from './modules/Frontend/Header';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Header user={user} setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> 
      <Routes>
        <Route path="/" element={<UrlShortener />} />
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/login" element={      <UserLogin isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </Router>
  );
}

export default App;
