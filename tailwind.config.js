/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Указываем, что будем следить за всеми файлами внутри src
  ],
  theme: {
    extend: {
      colors: {
        // Здесь можно добавить кастомные цвета, если нужно
        primary: '#1E40AF', // Например, синий для вашего сайта
        secondary: '#F59E0B', // Желтый для акцентов
        background: '#F3F4F6', // Светлый фон
      },
      fontFamily: {
        // Пример кастомного шрифта (если есть)
        sans: ['Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
