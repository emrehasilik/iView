// components/InterviewCard.jsx
import React from 'react';
import useInterviewStore from '../store/Interview_Store';
import { useNavigate } from 'react-router-dom';

const InterviewCard = ({ interview, index, removeInterview }) => {
  const navigate = useNavigate(); // Yönlendirme için useNavigate hook'u
  return (
    <div className="relative bg-white p-6 rounded-lg shadow-md w-[300px] h-[280px]">
      {/* Üst Kısım (Sil ve Copy Link) */}
      <div className="absolute top-2 left-2 flex items-center space-x-4">
        {/* Silme Butonu */}
        <button onClick={() => removeInterview(index)} className="text-red-500 hover:text-red-600 transition">
          🗑️
        </button>

        {/* Copy Link Butonu */}
        <button className="text-gray-500 hover:text-gray-600 transition">
          Copy Link
        </button>
        
      </div>

      {/* Başlık */}
      <h2 className="text-xl font-bold mb-2 text-center">{interview.title}</h2>

      {/* Aday Bilgileri */}
      <div className="text-center">
        <p className="font-bold mb-2">Candidates:</p>
        <div className="flex justify-around bg-gray-200 p-4 rounded-lg">
          <div>
            <p className="text-sm">TOTAL</p>
            <p className="text-lg font-bold">{interview.totalCandidates}</p>
          </div>
          <div>
            <p className="text-sm">ON HOLD</p>
            <p className="text-lg font-bold">{interview.onHoldCandidates}</p>
          </div>
        </div>
      </div>

      {/* Alt Kısım */}
      <div className="mt-4 text-center">
        <p className="text-gray-600 text-sm">Published</p>
        <button className="text-blue-500 mt-2"  onClick={() => navigate(`/video-collection/${index}`)}>See Videos &gt;</button>
      </div>
    </div>
  );
};

export default InterviewCard;
