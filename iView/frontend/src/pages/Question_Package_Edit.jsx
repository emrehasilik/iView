import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate'i import edin
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import AddQuestionPopup from '../popup/Add_Question';
import useManageQuestionStore from '../store/Manage_Question_Store';
import usePackageQuestionStore from '../store/Add_Question_Store'; // Yeni soruları eklemek için

const QuestionPackageEdit = () => {
  const { packageIndex } = useParams(); // URL'den paket indeksini alıyoruz
  const questionPackages = useManageQuestionStore((state) => state.questionPackages);
  const updatePackageQuestions = useManageQuestionStore((state) => state.updatePackageQuestions);
  
  const addedQuestions = usePackageQuestionStore((state) => state.questions);
  const clearQuestions = usePackageQuestionStore((state) => state.clearQuestions);

  const [isPopupOpen, setIsPopupOpen] = useState(false); // Pop-up aç/kapat durumu
  const [currentQuestions, setCurrentQuestions] = useState([]); // Paket sorularını tutan local state

  const packageToEdit = questionPackages[packageIndex]; // Düzenlemek istediğimiz paket
  const navigate = useNavigate(); // Yönlendirme için useNavigate hook'u

  // İlk render'da packageToEdit içindeki soruları local state'e alıyoruz
  useEffect(() => {
    if (packageToEdit) {
      setCurrentQuestions(packageToEdit.questions);
    }
  }, [packageToEdit]);

  // usePackageQuestionStore'dan eklenen soruları dinlemek ve currentQuestions'a eklemek için useEffect
  useEffect(() => {
    setCurrentQuestions((prevQuestions) => [...prevQuestions, ...addedQuestions]);
  }, [addedQuestions]);

  // Yeni soru eklediğimizde paketi güncelleme fonksiyonu
  const handleSaveQuestion = () => {
    if (!packageToEdit) return;

    // Paket içindeki sorulara geçici soruları ekleyin
    const updatedPackageQuestions = [...currentQuestions];
    updatePackageQuestions(packageIndex, updatedPackageQuestions); // Paket içeriğini güncelle

    clearQuestions(); // Popup'a eklenen geçici soruları sıfırla

    // Yönlendirme: Soru kaydedildikten sonra manage-question sayfasına yönlendir
    navigate('/manage-question');

    setIsPopupOpen(false); // Popup'u kapat
  };

  if (!packageToEdit) {
    return <div className="text-center text-red-500 font-bold mt-6">Bu paket mevcut değil.</div>;
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
            className="bg-blue-500 text-white text-lg font-bold p-3 rounded-full shadow hover:bg-blue-600 transition-all duration-300"
            onClick={() => setIsPopupOpen(true)}
          >
            +
          </button>
        </div>

        {/* Paket İçeriği (Sorular) */}
        <div className="w-full bg-gray-100 rounded-xl shadow p-6">
          <div className="grid grid-cols-4 gap-4 bg-gray-200 p-3 rounded-md font-bold">
            <div className="text-center">#</div>
            <div>Question</div>
            <div className="text-center">Time</div>
            <div className="text-center">Action</div>
          </div>

          {currentQuestions.length > 0 ? (
            currentQuestions.map((q, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 bg-white p-4 rounded-lg shadow mt-2">
                <div className="text-center">{index + 1}</div>
                <div>{q.question}</div>
                <div className="text-center">{q.minutes} min</div>
                <div className="flex justify-center">
                  <button className="text-red-500 hover:text-red-600 transition"></button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 mt-4">Henüz soru eklenmedi.</div>
          )}
        </div>

        {/* Alt Butonlar */}
        <div className="flex justify-between mt-6">
          <button
            className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition"
            onClick={handleSaveQuestion} // Bu kısmı kaldırmamamız gerekiyordu
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Add Question Popup */}
      {isPopupOpen && <AddQuestionPopup setIsPopupOpen={setIsPopupOpen} />}
    </div>
  );
};

export default QuestionPackageEdit;
