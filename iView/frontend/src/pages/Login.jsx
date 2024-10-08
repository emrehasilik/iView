import React from "react";
import useStore from "../store/store"; // Zustand store'u import ediyoruz

const Login = () => {
  // Zustand store'dan email, password ve setter fonksiyonlarını alıyoruz
  const { email, password, setEmail, setPassword } = useStore();

  const handleLogin = () => {
    // Form verileriyle bir işlem yapabilirsiniz
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-[70%] h-[80%] flex rounded-[30px] shadow-lg bg-white border-8 border-[#e2e2e5]">
        
        {/* Sol Kısım (Form Alanı) */}
        <div className="w-[50%] flex flex-col justify-center px-10 bg-gray-200 rounded-tl-[30px] rounded-bl-[30px]">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Log in Page</h1>

          {/* Email Giriş */}
          <label className="text-xl font-medium text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border-b-2 border-gray-400 bg-transparent w-full py-2 mb-6 outline-none"
            value={email} // Zustand'dan gelen email state'i
            onChange={(e) => setEmail(e.target.value)} // Zustand'dan setEmail fonksiyonu
          />

          {/* Şifre Giriş */}
          <label className="text-xl font-medium text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border-b-2 border-gray-400 bg-transparent w-full py-2 mb-8 outline-none"
            value={password} // Zustand'dan gelen password state'i
            onChange={(e) => setPassword(e.target.value)} // Zustand'dan setPassword fonksiyonu
          />

          {/* Giriş Butonu */}
          <button onClick={handleLogin} className="w-full bg-gray-700 text-white py-3 rounded-full text-lg">
            Log in
          </button>
        </div>

        {/* Sağ Kısım (Görsel Alanı) */}
        <div className="w-[50%] bg-gray-300 flex items-center justify-center rounded-tr-[30px] rounded-br-[30px]">
          <img src="https://via.placeholder.com/500" alt="Illustration" className="w-3/4" />
        </div>
      </div>
    </div>
  );
};

export default Login;
