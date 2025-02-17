import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { logPageView, logButtonClick } from './firebase'; // Импортируем функции для логирования

function App() {
  // Логирование посещения страницы при загрузке компонента
  useEffect(() => {
    logPageView(); // Логирование события при каждом рендере компонента
  }, []);

  // Логирование кликов по ссылкам
  const handleLinkClick = (linkName) => {
    logButtonClick(linkName); // Логирование клика по ссылке
  };

  return (
    <Router>
      <div className="p-4 max-w-4xl mx-auto">
        <nav className="flex justify-between p-4 bg-blue-500 text-white rounded-lg">
          <Link to="/" onClick={() => handleLinkClick('home')}>
            🏠 Главная
          </Link>
          <Link to="/register" onClick={() => handleLinkClick('register')}>
            📝 Регистрация
          </Link>
          <Link to="/login" onClick={() => handleLinkClick('login')}>
            🔑 Вход
          </Link>
          <Link to="/profile" onClick={() => handleLinkClick('profile')}>
            👤 Профиль
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
