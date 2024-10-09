import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import AddQuestionPopup from '../popup/Add_Question';
import useManageQuestionStore from '../store/Manage_Question_Store';
import usePackageQuestionStore from '../store/Add_Question_Store'; // Yeni soruları eklemek için

const QuestionPackageEdit = () => {
  const { packageIndex } = useParams(); // URL'den paket indeksini alıyoruz
  const questionPackages = useManageQuestionStore((state) => state.questionPackages);
  const updatePackageQuestions = useManageQuestionStore((state) => state.updatePackageQuestions);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Pop-up aç/kapat durumu
  const addQuestion = usePackageQuestionStore((state) => state.addQuestion);
  const removeQuestion = usePackageQuestionStore((state) => state.removeQuestion);
  const clearQuestions = usePackageQuestionStore((state) => state.clearQuestions);
  const packageToEdit = questionPackages[packageIndex]; // Düzenlemek istediğimiz paket

  // Yeni soru eklediğimizde paketi güncelleme fonksiyonu
  const handleSaveQuestion = () => {
    updatePackageQuestions(packageIndex, packageToEdit.questions);
    clearQuestions(); // Popup'a eklenen geçici soruları sıfırla
    setIsPopupOpen(false); // Popup'u kapat
  };

  if (!packageToEdit) {
    return <div>Bu paket mevcut değil.</div>;
  }

  return (
    <div className="flex w-full h-full">
      <Sidebar />
      <div className="flex-grow p-8">
        <Navbar />

        <div className="flex justify-between items-center mb-6 mt-4">
          <h1 className="text-xl font-bold">Edit Question Package: {packageToEdit.title}</h1>
          {/* "+" Butonu ile AddQuestionPopup açma */}
          <button
            className="bg-gray-300 text-black text-lg font-bold p-2 rounded-full z-20"
            onClick={() => setIsPopupOpen(true)}
          >
            +
          </button>
        </div>

        {/* Paket İçeriği (Sorular) */}
        <div className="w-full bg-gray-100 rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <div>#</div>
            <div>Question</div>
            <div>Time</div>
            <div>Action</div>
          </div>

          {packageToEdit.questions.map((q, index) => (
            <div key={index} className="flex justify-between items-center mb-4 bg-white p-4 rounded-lg shadow">
              <div>{index + 1}</div>
              <div>{q.question}</div>
              <div>{q.minutes} min</div>
              <div>
                <button className="text-red-500" onClick={() => removeQuestion(index)}>🗑️</button>
              </div>
            </div>
          ))}
        </div>

        {/* Alt Butonlar */}
        <div className="flex justify-between mt-6">
          <button className="bg-gray-500 text-white py-2 px-6 rounded-lg" onClick={handleSaveQuestion}>Save Changes</button>
        </div>
      </div>

      {/* Add Question Popup */}
      {isPopupOpen && <AddQuestionPopup setIsPopupOpen={setIsPopupOpen} />}
    </div>
  );
};

export default QuestionPackageEdit;
