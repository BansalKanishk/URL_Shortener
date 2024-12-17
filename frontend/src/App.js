import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UrlShortener from './modules/Frontend/UrlShortner';
import UserRegistration from './modules/Frontend/UserRegistration';
import UserLogin from './modules/Frontend/UserLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UrlShortener />} />
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/login" element={<UserLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
