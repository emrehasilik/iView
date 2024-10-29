import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full h-[68px] bg-blue-900 shadow-md flex items-center justify-between px-8 border-b-4 border-blue-700">
      {/* Sol Taraf: Logo ve Başlık */}
      <div className="flex items-center">
        <div className="w-[40px] h-[40px] bg-blue-700 rounded-full flex justify-center items-center text-white font-bold">
          R
        </div>
        <h1 className="ml-4 text-2xl font-semibold text-gray-100">Remote Tech Admin</h1>
      </div>

    

      {/* Sağ Taraf: Kullanıcı Profil ve Menü */}
      <div className="flex items-center">
      
        <button className="text-gray-200 ml-4 hover:text-blue-500">Log Out</button>

        {/* Mobil Hamburger Menü */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden ml-4 focus:outline-none">
          <div className="w-6 h-6 flex flex-col justify-between items-center">
            <span className="bg-gray-200 w-full h-[2px]"></span>
            <span className="bg-gray-200 w-full h-[2px]"></span>
            <span className="bg-gray-200 w-full h-[2px]"></span>
          </div>
        </button>
      </div>

    
    </div>
  );
};

export default Navbar;
