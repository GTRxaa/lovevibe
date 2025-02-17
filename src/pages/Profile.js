import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Для получения данных пользователя
import { logOut } from "../firebase"; // Функция выхода

export default function Profile() {
  const [user, setUser] = useState(null);

  // Подписка на состояние аутентификации
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Если пользователь авторизован, сохраняем его данные
      } else {
        setUser(null); // Если нет, очищаем данные
      }
    });

    return unsubscribe; // Очистка подписки при размонтировании компонента
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Профиль</h2>
      {user ? (
        <>
          <p className="text-lg mb-4">Email: {user.email}</p>
          {/* Если есть имя пользователя, можно вывести его */}
          {user.displayName && <p className="text-lg mb-4">Имя: {user.displayName}</p>}
          <button
            onClick={logOut}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Выйти
          </button>
        </>
      ) : (
        <p className="text-center text-lg">Вы не авторизованы. Пожалуйста, войдите.</p>
      )}
    </div>
  );
}
