import React, { useState } from 'react';
import usePackageQuestionStore from '../store/Package_Title_Store'; // Güncel store dosyası
import { CloseCircleOutlined, SaveOutlined } from '@ant-design/icons';

const Add_Question_Package = ({ setIsPopupOpen }) => {
  const [question, setQuestion] = useState('');
  const [minutes, setMinutes] = useState(2);
  const addQuestion = usePackageQuestionStore((state) => state.addQuestion);

  const handleSave = () => {
    if (question.trim() && minutes) {
      addQuestion(question.trim(), minutes); // Yeni soruyu store'a ekle
      setQuestion('');
      setMinutes(2);
      setIsPopupOpen(false);
    } else {
      alert("Lütfen soru ve süre girin.");
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

        <div className="flex items-center mb-4">
          <input
            type="number"
            className="w-20 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Minutes"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            min="1"
          />
          <span className="text-gray-500 ml-2 text-sm">min</span>
        </div>

        <div className="flex justify-between mt-6">
          <button
            className="bg-red-500 text-black py-2 px-6 rounded-lg hover:bg-red-700 transition flex items-center"
            onClick={() => setIsPopupOpen(false)}
          >
            <CloseCircleOutlined className="mr-2" />
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition flex items-center"
            onClick={handleSave}
          >
            <SaveOutlined className="mr-2" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Add_Question_Package;
