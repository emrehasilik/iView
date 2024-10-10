import React, { useState } from 'react';
import usePackageQuestionStore from '../store/Add_Question_Store'; // Store'u import ediyoruz

const AddQuestionPopup = ({ setIsPopupOpen }) => {
  const [question, setQuestion] = useState('');
  const [minutes, setMinutes] = useState(2); // Varsayılan değer 2
  const addQuestion = usePackageQuestionStore((state) => state.addQuestion); // Soru ekleme fonksiyonu

  const handleSave = () => {
    if (question.trim() && minutes) {
      addQuestion(question.trim(), minutes); // Soru ve dakika bilgilerini store'a ekle
      console.log("Soru eklendi:", question, minutes); // Kontrol amacıyla log
      setIsPopupOpen(false); // Pop-up'ı kapat
    } else {
      console.log("Soru veya dakika boş!"); // Eğer soru veya dakika boşsa uyarı
    }
  };

  return (
    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-20">
      <div className="bg-white w-[400px] p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Add Question</h2>
        
        <textarea
          className="w-full h-28 p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        
        <input
          type="number"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Minutes"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          min="1" // Minimum 1 dakika olarak ayarlandı
        />
        
        <div className="flex justify-between mt-6">
          <button
            className="bg-gray-300 text-black py-2 px-6 rounded-lg hover:bg-gray-400 transition"
            onClick={() => setIsPopupOpen(false)}
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
  );
};

export default AddQuestionPopup;
