import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import AddQuestionPopup from '../popup/Add_Question';
import axios from 'axios';
import { DeleteOutlined } from '@ant-design/icons';


const QuestionPackageEdit = () => {
  const { packageIndex } = useParams();
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [packageTitle, setPackageTitle] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  // Paket sorularını backend'den çekme fonksiyonu
  const fetchSelectedQuestionPackage = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/question-package/${packageIndex}`);
      setCurrentQuestions(response.data.questions);
      setPackageTitle(response.data.title);
    } catch (error) {
      console.error("Soru paketi alınırken hata oluştu:", error);
    }
  };

  useEffect(() => {
    fetchSelectedQuestionPackage();
  }, []);

  // Yeni soru eklendiğinde çağrılan fonksiyon
  const handleQuestionAdd = (newQuestion) => {
    setCurrentQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  };

  // Soru silme fonksiyonu
  const handleDeleteQuestion = async (questionId) => {
    try {
      await axios.delete(`http://localhost:5000/api/question-package/${packageIndex}/question/${questionId}`);
      setCurrentQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question._id !== questionId)
      );
    } catch (error) {
      console.error("Soru silinirken hata oluştu:", error);
    }
  };

  return (
    <div className="flex w-full h-full">
      <Sidebar />
      <div className="flex-grow p-8">
        <Navbar />

        <div className="flex justify-between items-center mb-6 mt-4">
          <h1 className="text-xl font-bold">Edit Question Package: {packageTitle}</h1>
          <button
            className="bg-blue-500 text-white text-lg font-bold p-3 rounded-full shadow hover:bg-blue-600 transition-all duration-300"
            onClick={() => setIsPopupOpen(true)}
          >
            +
          </button>
        </div>

        <div className="w-full bg-gray-100 rounded-xl shadow p-6">
          <div className="grid grid-cols-4 gap-4 bg-gray-200 p-3 rounded-md font-bold">
            <div className="text-center">#</div>
            <div>Question</div>
            <div className="text-center">Time</div>
            <div className="text-center">Action</div>
          </div>

          {currentQuestions.length > 0 ? (
            currentQuestions.map((q, index) => (
              <div key={q._id} className="grid grid-cols-4 gap-4 bg-white p-4 rounded-lg shadow mt-2">
                <div className="text-center">{index + 1}</div>
                <div>{q.question}</div>
                <div className="text-center">{q.minutes} min</div>
                <div className="flex justify-center">
                <button
  className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition flex items-center justify-center"
  onClick={() => handleDeleteQuestion(q._id)}
>
  <DeleteOutlined />
</button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 mt-4">Henüz soru eklenmedi.</div>
          )}
        </div>

        {/* Popup ile yeni soru ekleme */}
        {isPopupOpen && (
          <AddQuestionPopup setIsPopupOpen={setIsPopupOpen} onQuestionAdd={handleQuestionAdd} />
        )}
      </div>
      
    </div>
  );
};

export default QuestionPackageEdit;
