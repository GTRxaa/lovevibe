import React, { useState } from "react";
import { registerWithEmail, signInWithGoogle } from "../firebase";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Состояние загрузки
  const [error, setError] = useState(""); // Состояние ошибки

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // Включаем загрузку
    setError(""); // Очищаем предыдущие ошибки

    try {
      await registerWithEmail(email, password); // Пытаемся зарегистрировать пользователя
      alert("Регистрация успешна!"); // Успешно, можем показать сообщение
    } catch (err) {
      setError("Ошибка регистрации! Проверьте данные и попробуйте снова."); // Если ошибка, показываем сообщение
    } finally {
      setLoading(false); // Останавливаем загрузку
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Регистрация</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Выводим ошибку если есть */}
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          className="w-full p-2 mb-3 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading} // Делаем кнопку неактивной, если идет регистрация
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Регистрация..." : "Зарегистрироваться"}
        </button>
      </form>
      <button
        onClick={signInWithGoogle}
        className="w-full bg-red-500 text-white py-2 mt-3 rounded hover:bg-red-600"
      >
        Войти через Google
      </button>
    </div>
  );
}

export default Register;
