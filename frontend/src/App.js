import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UrlShortener from './modules/Frontend/UrlShortner';
import UserRegistration from './modules/Frontend/UserRegistration';
import UserLogin from './modules/Frontend/UserLogin';
import Header from './modules/Frontend/Header';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Header user={user} setUser={setUser} /> 
      <Routes>
        <Route path="/" element={<UrlShortener />} />
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/login" element={<UserLogin setUser={setUser} />} /> {/* Pass setUser to UserLogin */}
      </Routes>
    </Router>
  );
}

export default App;
