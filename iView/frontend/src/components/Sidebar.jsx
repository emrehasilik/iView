import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // useLocation ile aktif sayfa kontrolü

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Aktif sayfa bilgisini almak için

  const isActive = (path) => location.pathname === path; // Sayfanın aktif olup olmadığını kontrol eden fonksiyon

  return (
    <div className="w-[280px] h-screen bg-gradient-to-b from-[#4A90E2] to-[#50BFE6] rounded-tl-[30px] rounded-bl-[30px] p-5 flex flex-col justify-between shadow-lg">
      {/* Üst Kısım */}
      <div>
        {/* Başlık */}
        <h2 className="text-white text-[25px] font-bold font-['Cambria'] mb-8">Admin Panel</h2>

        {/* Menü Elemanları */}
        <nav className="space-y-4">
          {/* Manage Question Package Butonu */}
          <button
            className={`flex items-center p-2 text-base font-medium rounded-md transition-colors ${
              isActive('/manage-question') ? 'bg-[#2c82c9] text-white' : 'text-white hover:bg-[#2c82c9]'
            }`}
            onClick={() => navigate('/manage-question')}
          >
            <span className="mr-2">📄</span> Manage Question Package
          </button>

          {/* Interview List Butonu */}
          <button
            className={`flex items-center p-2 text-base font-medium rounded-md transition-colors ${
              isActive('/interview-list') ? 'bg-[#2c82c9] text-white' : 'text-white hover:bg-[#2c82c9]'
            }`}
            onClick={() => navigate('/interview-list')}
          >
            <span className="mr-2">👥</span> Interview List
          </button>
        </nav>
      </div>

      {/* Alt Kısım */}
      <div className="text-white text-sm mt-10">
        <p>&copy; 2024 Remote-Tech</p>
        <p className="text-xs mt-2">All rights reserved.</p>
      </div>
    </div>
  );
};

export default Sidebar;
