import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useStore from "../store/Login"; // Zustand store'u import ediyoruz


function Login() {
  const { email, password, setEmail, setPassword } = useStore();
  const [error, setError] = useState(null); // Hata mesajları için state
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/admin/login", {
        username: email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        const expiryTime = new Date().getTime() + 12 * 60 * 60 * 1000; // 12 saat
        localStorage.setItem("tokenExpiry", expiryTime.toString());

        setError(null); // Hata yok
        navigate("/manage-question"); // Başarılı giriş sonrası yönlendirme
      }
    } catch (err) {
      console.error(err); // Konsola hata yazdır
      setError("Invalid email or password. Please try again."); // Hata mesajı ayarla
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-[70%] h-[80%] flex rounded-[30px] shadow-lg bg-white border-8 border-[#e2e2e5]">
        {/* Sol Kısım */}
        <div className="w-[50%] flex flex-col justify-center px-10 bg-gray-200 rounded-tl-[30px] rounded-bl-[30px]">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Log in Page</h1>
          <label className="text-xl font-medium text-gray-700 mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="border-b-2 border-gray-400 bg-transparent w-full py-2 mb-6 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="text-xl font-medium text-gray-700 mb-2" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="border-b-2 border-gray-400 bg-transparent w-full py-2 mb-8 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button onClick={handleLogin} className="w-full bg-gray-700 text-white py-3 rounded-full text-lg">
            Log in
          </button>
        </div>
        {/* Sağ Kısım */}
        <div className="w-[50%] bg-gray-300 flex items-center justify-center rounded-tr-[30px] rounded-br-[30px]">
          <img src="/login.svg" alt="Illustration" className="w-3/4" />
        </div>
      </div>
    </div>
  );
}

export default Login;
