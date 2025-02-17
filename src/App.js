import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { logPageView, logButtonClick } from "./firebase"; // Теперь эти функции есть!

function App() {
  useEffect(() => {
    logPageView(); // Логируем посещение страницы
  }, []);

  const handleLinkClick = (linkName) => {
    logButtonClick(linkName);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-blue-600 text-white p-4 shadow-md">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="text-xl font-semibold">LoveVibe</div>
            <div className="flex space-x-6">
              <Link to="/" onClick={() => handleLinkClick("home")} className="text-lg hover:text-gray-300">
                🏠 Главная
              </Link>
              <Link to="/register" onClick={() => handleLinkClick("register")} className="text-lg hover:text-gray-300">
                📝 Регистрация
              </Link>
              <Link to="/login" onClick={() => handleLinkClick("login")} className="text-lg hover:text-gray-300">
                🔑 Вход
              </Link>
              <Link to="/profile" onClick={() => handleLinkClick("profile")} className="text-lg hover:text-gray-300">
                👤 Профиль
              </Link>
            </div>
          </div>
        </nav>

        <div className="p-6 bg-white shadow-lg rounded-lg max-w-7xl mx-auto mt-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
