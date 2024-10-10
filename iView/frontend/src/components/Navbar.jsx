import React from 'react';

const Navbar = () => {
  return (
    <div className="w-full h-[68px] bg-white shadow-md flex items-center justify-between px-8 border-b-4 border-gray-200">
      {/* Sol Taraf: Logo veya Başlık */}
      <div className="flex items-center">
        {/* Logo */}
        <div className="w-[40px] h-[40px] bg-blue-500 rounded-full flex justify-center items-center text-white font-bold">
          R
        </div>
        <h1 className="ml-4 text-2xl font-semibold text-gray-700">Remote Tech Admin</h1>
      </div>

     
    </div>
  );
};

export default Navbar;
