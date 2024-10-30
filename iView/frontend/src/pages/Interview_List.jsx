// pages/Interview_List.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import AddInterviewPopup from '../popup/Add_Interview';
import useInterviewStore from '../store/Interview_Store';
import InterviewCard from '../components/InterviewCard';

const InterviewList = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Pop-up durumu
  const interviews = useInterviewStore((state) => state.interviews);
  const setInterviews = useInterviewStore((state) => state.setInterviews);
  const removeInterview = useInterviewStore((state) => state.removeInterview);

  // Sayfa yüklendiğinde mülakatları çek
  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/interviews');
        setInterviews(response.data); // Gelen veriyi store'a ekle
      } catch (error) {
        console.error("Mülakatlar alınırken hata:", error);
      }
    };
    fetchInterviews();
  }, [setInterviews]);

  return (
    <div className="flex w-full h-full">
      <Sidebar />
      <div className="flex-grow p-8">
        <Navbar />

        <div className="flex justify-between items-center mb-6 mt-4">
          <h1 className="text-xl font-bold">Interview List</h1>
          <button
            className="bg-blue-500 text-white text-lg font-bold p-3 rounded-full shadow hover:bg-blue-600 transition-all duration-300"
            onClick={() => setIsPopupOpen(true)}
          >
            +
          </button>
        </div>

        {interviews.length > 0 ? (
          <div className="grid grid-cols-3 gap-6">
            {interviews.map((interview, index) => (
              <InterviewCard key={index} interview={interview} index={index} removeInterview={removeInterview} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-4">No interviews have been created yet.</div>
        )}

        {isPopupOpen && <AddInterviewPopup setIsPopupOpen={setIsPopupOpen} />}
      </div>
    </div>
  );
};

export default InterviewList;
