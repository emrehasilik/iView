import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar'; 
import Navbar from '../components/Navbar'; 
import Add_Question_Package from '../popup/Add_Question_Package';
import axios from 'axios';
import { DeleteOutlined , CloseCircleOutlined , SaveOutlined} from '@ant-design/icons';

import usePackageQuestionStore from '../store/Package_Title_Store'; 
import useManageQuestionStore from '../store/Manage_Question_Store'; 

const PackageTitle = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); 
  const packageTitle = usePackageQuestionStore((state) => state.packageTitle);
  const setPackageTitle = usePackageQuestionStore((state) => state.setPackageTitle);
  const questions = usePackageQuestionStore((state) => state.questions);
  const addQuestion = usePackageQuestionStore((state) => state.addQuestion);
  const clearQuestions = usePackageQuestionStore((state) => state.clearAll); // Verileri temizleme işlevi
  const removeQuestion = usePackageQuestionStore((state) => state.removeQuestion); 
  const addQuestionPackage = useManageQuestionStore((state) => state.addQuestionPackage); 
  const navigate = useNavigate();

  // Sayfa kapatıldığında veya bileşen yüklendiğinde verileri temizle
  useEffect(() => {
    return () => {
      clearQuestions(); // Sayfadan çıkarken verileri temizle
    };
  }, []);

  // Soru paketini kaydetme fonksiyonu
  const handleSave = async () => {
    console.log("Save button clicked");
  
    if (questions.length > 0 && packageTitle) {
      try {
        const response = await axios.post('http://localhost:5000/api/question-package', {
          title: packageTitle,
          questions
        });
        console.log('Paket başarıyla kaydedildi:', response.data);
  
        // Store'u temizle
        clearQuestions();
        navigate('/manage-question'); // ManageQuestion sayfasına yönlendirme
      } catch (error) {
        console.error('Paket kaydedilirken hata oluştu:', error);
      }
    } else {
      console.log('Lütfen paket başlığı ve soru ekleyin!');
    }
  };

  // Cancel butonuna tıklanıldığında bilgileri temizleme ve yönlendirme
  const handleCancel = () => {
    clearQuestions();
    navigate('/manage-question');
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
                    <button
                      className="text-red-500 hover:text-red-600 transition"
                      onClick={() => removeQuestion(index)} // Soru silme işlevi
                    >
                      <DeleteOutlined style={{ fontSize: '18px' }} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No questions have been added yet.</p>
            )}
          </div>

          {/* Alt Butonlar */}
          <div className="flex justify-between mt-6">
            <button
             className="bg-red-500 text-black py-2 px-6 rounded-lg hover:bg-red-700 transition flex items-center"
              onClick={handleCancel} // Cancel butonunda handleCancel fonksiyonunu çağırıyoruz
            >
                <CloseCircleOutlined className="mr-2" /> {/* CloseCircleOutlined ikonu eklendi */}
                Cancel
            </button>
            <button
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition flex items-center"
              onClick={handleSave}
            >
              <SaveOutlined className="mr-2" /> {/* SaveOutlined ikonu eklendi */}
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Add Question Popup */}
      {isPopupOpen && (
        <Add_Question_Package 
          setIsPopupOpen={setIsPopupOpen} 
          onQuestionAdd={(newQuestion) => addQuestion(newQuestion.question, newQuestion.minutes)} 
        />
      )}
    </div>
  );
};

export default PackageTitle;
