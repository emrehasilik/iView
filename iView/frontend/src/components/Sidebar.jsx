import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // useLocation ile aktif sayfa kontrolü

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Aktif sayfa bilgisini almak için

  const isActive = (path) => location.pathname === path; // Sayfanın aktif olup olmadığını kontrol eden fonksiyon

  return (
    <div className="w-[280px] h-screen bg-blue-900 rounded-tl-[30px] rounded-bl-[30px] p-5 flex flex-col justify-between shadow-lg">
      {/* Üst Kısım */}
      <div>
        {/* Başlık */}
        <h2 className="text-gray-100 text-[25px] font-bold font-['Cambria'] mb-8">Admin Panel</h2>

        {/* Menü Elemanları */}
        <nav className="space-y-4">
          {/* Manage Question Package Butonu */}
          <button
            className={`flex items-center p-2 text-base font-medium rounded-md transition-colors ${
              isActive('/manage-question') ? 'bg-blue-700 text-white' : 'text-gray-200 hover:bg-blue-700'
            }`}
            onClick={() => navigate('/manage-question')}
          >
            <span className="mr-1">📄</span> Manage Question Package
          </button>

          {/* Interview List Butonu */}
          <button
            className={`flex items-center p-2 text-base font-medium rounded-md transition-colors ${
              isActive('/interview-list') ? 'bg-blue-700 text-white' : 'text-gray-200 hover:bg-blue-700'
            }`}
            onClick={() => navigate('/interview-list')}
          >
            <span className="mr-1">👥</span> Interview List
          </button>
        </nav>
      </div>

      {/* Alt Kısım */}
      <div className="text-gray-200 text-sm mt-10">
        <p>&copy; 2024 Remote-Tech</p>
        <p className="text-xs mt-2">All rights reserved.</p>
      </div>
    </div>
  );
};

export default Sidebar;
