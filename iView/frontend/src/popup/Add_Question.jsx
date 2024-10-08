import React, { useState } from 'react';
import usePackageQuestionStore from '../store/Package_Title_Store'; // Store'u import ediyoruz

const AddQuestionPopup = ({ setIsPopupOpen }) => {
  const [minutes, setMinutes] = useState(2);
  const [question, setQuestion] = useState('');
  const addQuestion = usePackageQuestionStore((state) => state.addQuestion); // Store'daki ekleme fonksiyonunu kullanıyoruz

  // Sadece sayısal girişe izin verilecek
  const handleMinutesChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setMinutes(value);
    }
  };

  // Veriyi kaydetme fonksiyonu
  const handleSave = () => {
    addQuestion(question, minutes); // Soru ve dakika bilgilerini store'a kaydediyoruz
    setIsPopupOpen(false); // Popup'u kapatıyoruz
  };

  return (
    <div className="absolute top-1/4 left-1/4 w-[600px] h-[400px] bg-white rounded-xl shadow-lg z-20 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Add Question</h2>
        <button className="text-xl" onClick={() => setIsPopupOpen(false)}>✖</button>
      </div>
      <div className="mt-4">
        <label className="block text-lg font-bold mb-2">Question</label>
        <textarea
          className="w-full h-24 p-2 border rounded"
          placeholder="Input...."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>
      <div className="mt-4 flex items-center">
        <input
          type="text"
          value={minutes}
          onChange={handleMinutesChange}
          className="w-12 p-2 border rounded text-center mr-2"
        />
        <span className="text-lg">min</span>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          className="bg-gray-500 text-white py-2 px-6 rounded-lg"
          onClick={handleSave} // Save butonuna tıklanınca veri kaydedilecek
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddQuestionPopup;
