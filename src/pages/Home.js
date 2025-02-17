import React from "react";

export default function Home() {
  console.log("Home component rendered!");

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
      <div className="text-center text-white p-6 md:p-12 rounded-xl shadow-lg max-w-3xl">
        <h1 className="text-4xl font-extrabold mb-4">Добро пожаловать на сайт знакомств!</h1>
        <p className="text-lg mb-6">
          Мы поможем вам найти людей с общими интересами. Создайте профиль, общайтесь и встречайтесь!
        </p>
        <div className="flex justify-center space-x-6">
          <button className="bg-white text-blue-600 py-2 px-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition duration-300">
            Регистрация
          </button>
          <button className="bg-white text-blue-600 py-2 px-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition duration-300">
            Вход
          </button>
        </div>
      </div>
    </div>
  );
}
