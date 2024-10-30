// components/InterviewCard.jsx
import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import useInterviewStore from '../store/Interview_Store';
import { useNavigate } from 'react-router-dom';

const InterviewCard = ({ interview }) => {
  const navigate = useNavigate();
  const removeInterview = useInterviewStore((state) => state.removeInterview);

  return (
    <div className="relative bg-white p-6 rounded-lg shadow-md w-[300px] h-[280px]">
      <div className="absolute top-2 left-2 flex items-center space-x-4">
        {/* Silme Butonu */}
        <button onClick={() => removeInterview(interview._id)} className="text-red-500 hover:text-red-600 transition">
          <DeleteOutlined style={{ fontSize: '18px' }} />
        </button>

        {/* Copy Link Butonu */}
        <button className="text-gray-500 hover:text-gray-600 transition">Copy Link</button>
      </div>

      <h2 className="text-xl font-bold mb-2 text-center">{interview.title}</h2>

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

      <div className="mt-4 text-center">
        <p className="text-gray-600 text-sm">Published</p>
        <button className="text-blue-500 mt-2" onClick={() => navigate(`/video-collection/${interview._id}`)}>
          See Videos &gt;
        </button>
      </div>
    </div>
  );
};

export default InterviewCard;
