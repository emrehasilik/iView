import React, { useState } from 'react';
import usePackageQuestionStore from '../store/Package_Title_Store';

const EditQuestionPopup = ({ setEditPopupOpen, question, minutes, index }) => {
  const [editedQuestion, setEditedQuestion] = useState(question);
  const [editedMinutes, setEditedMinutes] = useState(minutes);
  const updateQuestion = usePackageQuestionStore((state) => state.updateQuestion);

  // Soruyu güncelleme işlemi
  const handleUpdate = () => {
    updateQuestion(index, editedQuestion, editedMinutes);
    setEditPopupOpen(false); // Popup'ı kapat
  };

  return (
    <div className="absolute top-1/3 left-1/3 w-[400px] bg-white p-6 rounded-lg shadow-lg z-20">
      <h2 className="text-xl font-bold mb-4">Edit Question</h2>
      <textarea
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        value={editedQuestion}
        onChange={(e) => setEditedQuestion(e.target.value)}
      />
      <input
        type="number"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        value={editedMinutes}
        onChange={(e) => setEditedMinutes(e.target.value)}
      />
      <div className="flex justify-between">
        <button className="bg-gray-300 text-black py-2 px-6 rounded-lg" onClick={() => setEditPopupOpen(false)}>Cancel</button>
        <button className="bg-gray-500 text-white py-2 px-6 rounded-lg" onClick={handleUpdate}>Save</button>
      </div>
    </div>
  );
};

export default EditQuestionPopup;
