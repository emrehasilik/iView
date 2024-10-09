import React, { useState } from 'react';
import usePackageQuestionStore from '../store/Add_Question_Store'; // Store'u import ediyoruz

const AddQuestionPopup = ({ setIsPopupOpen }) => {
  const [question, setQuestion] = useState('');
  const [minutes, setMinutes] = useState(2); // Varsayılan değer 2
  const addQuestion = usePackageQuestionStore((state) => state.addQuestion); // Soru ekleme fonksiyonu

  const handleSave = () => {
    if (question && minutes) {
      addQuestion(question, minutes); // Soru ve dakika bilgilerini store'a ekle
      console.log("Soru eklendi:", question, minutes); // Kontrol amacıyla log
      setIsPopupOpen(false); // Pop-up'ı kapat
    } else {
      console.log("Soru veya dakika boş!"); // Eğer soru veya dakika boşsa uyarı
    }
  };

  return (
    <div className="absolute top-1/3 left-1/3 w-[400px] bg-white p-6 rounded-lg shadow-lg z-20">
      <h2 className="text-xl font-bold mb-4">Add Question</h2>
      <textarea
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="Write your question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <input
        type="number"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="Minutes"
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
        min="1" // Minimum 1 dakika olarak ayarlanmış
      />
      <div className="flex justify-between">
        <button className="bg-gray-300 text-black py-2 px-6 rounded-lg" onClick={() => setIsPopupOpen(false)}>
          Cancel
        </button>
        <button className="bg-gray-500 text-white py-2 px-6 rounded-lg" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddQuestionPopup;
