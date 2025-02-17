import React, { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Регистрация</h1>
      <input type="email" placeholder="Email" className="border p-2 w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Пароль" className="border p-2 w-full mt-2" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-blue-500 text-white p-2 mt-2">Зарегистрироваться</button>
    </div>
  );
}
