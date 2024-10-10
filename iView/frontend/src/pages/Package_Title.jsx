import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar'; 
import Navbar from '../components/Navbar'; 
import AddQuestionPopup from '../popup/Add_Question'; 
import usePackageQuestionStore from '../store/Add_Question_Store'; 
import useManageQuestionStore from '../store/Manage_Question_Store'; 

const PackageTitle = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); 
  const [packageTitle, setPackageTitle] = useState(''); 
  const questions = usePackageQuestionStore((state) => state.questions); 
  const addQuestionPackage = useManageQuestionStore((state) => state.addQuestionPackage); 
  const clearQuestions = usePackageQuestionStore((state) => state.clearQuestions); 
  const removeQuestion = usePackageQuestionStore((state) => state.removeQuestion); 
  const navigate = useNavigate();

  // Soru paketini kaydetme fonksiyonu
  const handleSave = () => {
    if (questions.length > 0 && packageTitle) {
      addQuestionPackage({ title: packageTitle, questions });
      clearQuestions();
      setPackageTitle('');
      navigate('/manage-question'); // ManageQuestion sayfasına yönlendirme
    } else {
      console.log('Lütfen paket başlığı ve soru ekleyin!');
    }
  };

  return (
    <div className="relative w-full h-full bg-gray-50">
      {/* Popup Açıkken Arka Plan Gri */}
      {isPopupOpen && <div className="absolute inset-0 bg-gray-600 opacity-50 z-10"></div>}

      <div className="flex w-full h-full">
        <Sidebar />
        
        <div className={`flex-grow p-8 ${isPopupOpen ? 'pointer-events-none' : ''}`}>
          <Navbar />

          {/* Başlık ve "+" Butonu */}
          <div className="flex justify-between items-center mb-6 mt-4">
            <h1 className="text-2xl font-bold">Create Question Package</h1>
            <button
              className="bg-blue-500 text-white text-lg font-bold p-2 rounded-full shadow hover:bg-blue-600 transition"
              onClick={() => setIsPopupOpen(true)}
            >
              +
            </button>
          </div>

          {/* Paket Başlığı */}
          <div className="w-full mb-6">
            <input
              className="w-full p-4 bg-white text-xl font-semibold text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow"
              placeholder="Enter Package Title..."
              value={packageTitle}
              onChange={(e) => setPackageTitle(e.target.value)}
            />
          </div>

          {/* Soru Listesi */}
          <div className="w-full bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center font-semibold text-lg mb-4">
              <div>Order</div>
              <div>Question</div>
              <div>Time</div>
              <div>Action</div>
            </div>

            {questions.length > 0 ? (
              questions.map((q, index) => (
                <div key={index} className="flex justify-between items-center mb-4 bg-gray-50 p-4 rounded-lg shadow">
                  <div>{index + 1}</div>
                  <div>{q.question}</div>
                  <div>{q.minutes} min</div>
                  <div className="flex space-x-2">
                    <button className="text-red-500" onClick={() => removeQuestion(index)}>🗑️</button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Henüz soru eklenmedi.</p>
            )}
          </div>

          {/* Alt Butonlar */}
          <div className="flex justify-between mt-6">
            <button
              className="bg-gray-400 text-white py-2 px-6 rounded-lg hover:bg-gray-500 transition"
              onClick={() => navigate('/manage-question')}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Add Question Popup */}
      {isPopupOpen && <AddQuestionPopup setIsPopupOpen={setIsPopupOpen} />}
    </div>
  );
};

export default PackageTitle;
