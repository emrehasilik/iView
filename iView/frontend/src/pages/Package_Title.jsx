import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar'; 
import Navbar from '../components/Navbar'; 
import AddQuestionPopup from '../popup/Add_Question'; 
import usePackageQuestionStore from '../store/Add_Question_Store'; 
import useManageQuestionStore from '../store/Manage_Question_Store'; 
import EditQuestionPopup from '../popup/Edit_Question';

const PackageTitle = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); 
  const [editPopupOpen, setEditPopupOpen] = useState(false); 
  const [editIndex, setEditIndex] = useState(null); 
  const [packageTitle, setPackageTitle] = useState(''); 
  const questions = usePackageQuestionStore((state) => state.questions); 
  const addQuestionPackage = useManageQuestionStore((state) => state.addQuestionPackage); 
  const clearQuestions = usePackageQuestionStore((state) => state.clearQuestions); 
  const removeQuestion = usePackageQuestionStore((state) => state.removeQuestion); 
  const navigate = useNavigate();

  const handleSave = () => {
    if (questions.length > 0 && packageTitle) {
      addQuestionPackage({ title: packageTitle, questions });
      clearQuestions();
      setPackageTitle('');
      navigate('/manage-question'); // ManageQuestion sayfasına yönlendir
    }
  };

  // Soru düzenleme popup'ını açma
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditPopupOpen(true);
  };

  return (
    <div className="relative w-full h-full">
      {(isPopupOpen || editPopupOpen) && <div className="absolute inset-0 bg-gray-600 opacity-50 z-10"></div>}

      <div className="flex w-full h-full">
        <Sidebar />
        <div className={`flex-grow p-8 ${isPopupOpen || editPopupOpen ? 'pointer-events-none' : ''}`}>
          <Navbar />

          <div className="flex justify-between items-center mb-6 mt-4">
            <h1 className="text-xl font-bold">Remote-tech Admin Page</h1>
            <button
              className="bg-gray-300 text-black text-lg font-bold p-2 rounded-full z-20"
              onClick={() => setIsPopupOpen(true)}
            >
              +
            </button>
          </div>

          <div className="w-[300px] h-[45px] mb-6 bg-[#f5f7fb] rounded-xl shadow border border-[#afb1b6]">
            <input
              className="w-full h-full text-2xl p-2 text-[#adadad] font-bold"
              placeholder="Package Title..."
              value={packageTitle}
              onChange={(e) => setPackageTitle(e.target.value)}
            />
          </div>

          <div className="w-full bg-gray-100 rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <div>Order</div>
              <div>Question</div>
              <div>Time</div>
              <div>Action</div>
            </div>

            {questions.map((q, index) => (
              <div key={index} className="flex justify-between items-center mb-4 bg-white p-4 rounded-lg shadow">
                <div className="text-center">≡</div>
                <div>{q.question}</div>
                <div>{q.minutes} min</div>
                <div className="flex space-x-2">
                
                  <button className="text-red-500" onClick={() => removeQuestion(index)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <button className="bg-gray-300 text-black py-2 px-6 rounded-lg" onClick={() => navigate('/manage-question')}>Cancel</button>
            <button className="bg-gray-500 text-white py-2 px-6 rounded-lg" onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>

      {isPopupOpen && <AddQuestionPopup setIsPopupOpen={setIsPopupOpen} />}

      {editPopupOpen && (
        <EditQuestionPopup
          setEditPopupOpen={setEditPopupOpen}
          question={questions[editIndex]?.question} 
          minutes={questions[editIndex]?.minutes} 
          index={editIndex}
        />
      )}
    </div>
  );
};

export default PackageTitle;
