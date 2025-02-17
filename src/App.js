import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile"; // Импортируем EditProfile
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { logOut } from "./firebase";
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate здесь
import { ToastContainer } from "react-toastify"; // Импортируем ToastContainer для уведомлений
import "react-toastify/dist/ReactToastify.css"; // Импортируем стили для уведомлений

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Подписка на состояние аутентификации
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Сохраняем данные пользователя
      } else {
        setUser(null); // Если нет, очищаем данные
      }
      setLoading(false); // Загрузка завершена
    });

    return unsubscribe; // Очистка подписки при размонтировании компонента
  }, []);

  const handleLogout = () => {
    logOut();
    setUser(null); // Очистить данные пользователя после выхода
    navigate("/"); // Перенаправить на главную страницу после выхода
  };

  if (loading) {
    return <div className="text-center">Загрузка...</div>; // Пока идет проверка состояния пользователя, отображаем индикатор загрузки
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-600 text-white p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-xl font-semibold">LoveVibe</div>
          <div className="flex space-x-6">
            <Link to="/" className="text-lg hover:text-gray-300">
              🏠 Главная
            </Link>
            {!user ? (
              <>
                <Link to="/register" className="text-lg hover:text-gray-300">
                  📝 Регистрация
                </Link>
                <Link to="/login" className="text-lg hover:text-gray-300">
                  🔑 Вход
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="text-lg hover:text-gray-300">
                  👤 Профиль
                </Link>
                <Link to="/edit-profile" className="text-lg hover:text-gray-300">
                 ✏️ Редактировать профиль
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-lg hover:text-gray-300"
                >
                  🚪 Выйти
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="p-6 bg-white shadow-lg rounded-lg max-w-7xl mx-auto mt-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={user ? <Profile /> : <Login />} />
          <Route path="/edit-profile" element={user ? <EditProfile /> : <Login />} /> {/* Защищаем страницу редактирования профиля */}
        </Routes>
      </div>

      {/* Добавляем ToastContainer в конце, чтобы он был доступен на всех страницах */}
      <ToastContainer />
    </div>
  );
}

export default App;
