import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; // Импортируем BrowserRouter
import 'react-toastify/dist/ReactToastify.css'; // Импортируем стили для react-toastify
import { AuthProvider } from './context/AuthContext'; // Импортируем AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Оборачиваем компонент App в BrowserRouter */}
      <AuthProvider> {/* Оборачиваем все приложение в AuthProvider */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Если ты хочешь начать измерять производительность в своем приложении, передай функцию
// для логирования результатов (например: reportWebVitals(console.log))
// или отправь их в аналитический эндпоинт. Узнать больше: https://bit.ly/CRA-vitals
reportWebVitals();
