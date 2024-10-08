import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar'; 
import Navbar from '../components/Navbar'; 
import AddQuestionPopup from '../popup/Add_Question'; 
import usePackageQuestionStore from '../store/Package_Title_Store'; 
import useManageQuestionStore from '../store/Manage_Question_Store'; 

const PackageTitle = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); 
  const [editPopupOpen, setEditPopupOpen] = useState(false); // Düzenleme popup'ı
  const [editIndex, setEditIndex] = useState(null); // Düzenlenecek sorunun indexi
  const [editedQuestion, setEditedQuestion] = useState(''); // Düzenlenecek soru
  const [editedMinutes, setEditedMinutes] = useState(''); // Düzenlenecek dakika
  const [packageTitle, setPackageTitle] = useState(''); // Paket başlığını tutuyoruz
  const questions = usePackageQuestionStore((state) => state.questions); 
  const addQuestionPackage = useManageQuestionStore((state) => state.addQuestionPackage); 
  const clearQuestions = usePackageQuestionStore((state) => state.clearQuestions); 
  const removeQuestion = usePackageQuestionStore((state) => state.removeQuestion); // Soru silme fonksiyonu
  const updateQuestion = usePackageQuestionStore((state) => state.updateQuestion); // Soru güncelleme fonksiyonu
  const navigate = useNavigate();

  // Soru paketini kaydetme fonksiyonu
  const handleSave = () => {
    if (questions.length > 0 && packageTitle) {
      addQuestionPackage({ title: packageTitle, questions }); // Başlık ve soruları ekle
      clearQuestions(); // Soruları sıfırla
      setPackageTitle(''); // Başlığı sıfırla
      console.log("Soru paketi başarıyla kaydedildi:", packageTitle, questions);
    }
  };

  // Soru düzenleme popup'ını açma
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedQuestion(questions[index].question);
    setEditedMinutes(questions[index].minutes);
    setEditPopupOpen(true);
  };

  // Soruyu güncelleme işlemi
  const handleUpdate = () => {
    updateQuestion(editIndex, editedQuestion, editedMinutes);
    setEditPopupOpen(false);
  };

  return (
    <div className="relative w-full h-full">
      {/* Popup Açıkken Arka Plan Gri */}
      {(isPopupOpen || editPopupOpen) && <div className="absolute inset-0 bg-gray-600 opacity-50 z-10"></div>}

      <div className="flex w-full h-full">
        {/* Sol Menü Sidebar */}
        <Sidebar />

        {/* Sağ İçerik Alanı */}
        <div className={`flex-grow p-8 ${isPopupOpen || editPopupOpen ? 'pointer-events-none' : ''}`}>
          {/* Üst Navbar */}
          <Navbar />

          {/* Üst Menü ve "+" Butonu */}
          <div className="flex justify-between items-center mb-6 mt-4">
            <h1 className="text-xl font-bold">Remote-tech Admin Page</h1>
            <div className="flex items-center space-x-4">
              <button className="text-lg font-bold"></button>
              {/* "+" Butonu ile Popup açma */}
              <button
                className="bg-gray-300 text-black text-lg font-bold p-2 rounded-full z-20"
                onClick={() => setIsPopupOpen(true)}
              >
                +
              </button>
            </div>
          </div>

          {/* Soru Paketi Başlığı */}
          <div className="w-[300px] h-[45px] mb-6 bg-[#f5f7fb] rounded-xl shadow border border-[#afb1b6]">
            <input
              className="w-full h-full text-2xl p-2 text-[#adadad] font-bold"
              placeholder="Package Title..."
              value={packageTitle}
              onChange={(e) => setPackageTitle(e.target.value)} // Başlık güncelleme
            />
          </div>

          {/* Soru Tablosu */}
          <div className="w-full bg-gray-100 rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <div>Order</div>
              <div>Question</div>
              <div>Time</div>
              <div>Action</div>
            </div>

            {/* Sorular Listesi */}
            {questions.map((q, index) => (
              <div key={index} className="flex justify-between items-center mb-4 bg-white p-4 rounded-lg shadow">
                <div className="text-center">≡</div>
                <div>{q.question}</div>
                <div>{q.minutes} min</div>
                <div className="flex space-x-2">
                  {/* Düzenleme Butonu */}
                  <button
                    className="text-blue-500"
                    onClick={() => handleEdit(index)}
                  >
                    ✏️
                  </button>
                  {/* Silme Butonu */}
                  <button className="text-red-500" onClick={() => removeQuestion(index)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>

          {/* Alt Butonlar */}
          <div className="flex justify-between mt-6">
            <button className="bg-gray-300 text-black py-2 px-6 rounded-lg" onClick={() => navigate('/manage-question')}>Cancel</button>
            <button className="bg-gray-500 text-white py-2 px-6 rounded-lg" onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>

      {/* Add Question Popup */}
      {isPopupOpen && <AddQuestionPopup setIsPopupOpen={setIsPopupOpen} />}

      {/* Soru Düzenleme Popup'ı */}
      {editPopupOpen && (
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
      )}
    </div>
  );
};

export default PackageTitle;
