import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <div className="p-4 max-w-4xl mx-auto">
        <nav className="flex justify-between p-4 bg-blue-500 text-white rounded-lg">
          <Link to="/">🏠 Главная</Link>
          <Link to="/register">📝 Регистрация</Link>
          <Link to="/login">🔑 Вход</Link>
          <Link to="/profile">👤 Профиль</Link>
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
