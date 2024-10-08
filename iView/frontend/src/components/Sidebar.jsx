import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-[280px] h-[1080px] bg-[#e2e2e5] rounded-tl-[30px] rounded-bl-[30px] border-[#afb1b6] border p-5">
      <h2 className="text-black text-[25px] font-bold font-['Cambria'] mb-8">Admin Panel</h2>
      <nav className="space-y-4">
        {/* Manage Question Package Button */}
        <button
          className="text-black text-base font-medium flex items-center space-x-2"
          onClick={() => navigate('/manage-question')}
        >
          <span className="icon">📄</span>
          <span>Manage Question Package</span>
        </button>

        {/* Interview List Button */}
        <button className="text-black text-base font-medium flex items-center space-x-2">
          <span className="icon">👥</span>
          <span>Interview List</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
