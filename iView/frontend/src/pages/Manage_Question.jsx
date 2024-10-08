import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import Sidebar from '../components/Sidebar'; 
import Navbar from '../components/Navbar'; 
import useManageQuestionStore from '../store/Manage_Question_Store'; // Store'u import ediyoruz

const ManageQuestion = () => {
  const questionPackages = useManageQuestionStore((state) => state.questionPackages); // Soru paketlerini alıyoruz
  const navigate = useNavigate(); // Sayfalar arası geçiş yapmak için kullanıyoruz

  return (
    <div className="flex w-full h-full">
      {/* Sol Menü Sidebar */}
      <Sidebar />

      {/* Sağ İçerik Alanı */}
      <div className="flex-grow p-8">
        {/* Üst Navbar */}
        <Navbar />

        {/* Üst Menü ve "+" Butonu */}
        <div className="flex justify-between items-center mb-6 mt-4">
          <h1 className="text-xl font-bold">Manage Question Package</h1>
          <div className="flex items-center space-x-4">
            {/* "+" Butonu ile Package Title sayfasına yönlendirme */}
            <button
              className="bg-gray-300 text-black text-lg font-bold p-2 rounded-full"
              onClick={() => navigate('/package-title')}
            >
              +
            </button>
          </div>
        </div>

        {/* Soru Paketleri Tablosu */}
        <div className="w-full bg-gray-100 rounded-xl shadow p-6">
          <div className="flex justify-between items-center bg-gray-200 p-4 rounded-lg mb-4">
            <div>#</div>
            <div>Package Name</div>
            <div>Question Count</div>
            <div>Action</div>
          </div>

          {Array.isArray(questionPackages) && questionPackages.length > 0 ? (
            questionPackages.map((packageItem, packageIndex) => (
              <div key={packageIndex} className="flex justify-between items-center mb-4 bg-white p-4 rounded-lg shadow">
                <div>{packageIndex + 1}</div> {/* Paket sırası */}
                <div>{packageItem.title}</div> {/* Paket Başlığı */}
                <div>{packageItem.questions.length}</div> {/* Soru sayısı */}
                <div className="flex space-x-4">
                  {/* Düzenleme butonu (şu anda sadece simge, fonksiyonlar sonra eklenecek) */}
                  <button className="text-blue-500">
                    ✏️
                  </button>
                  {/* Silme butonu (şu anda sadece simge, fonksiyonlar sonra eklenecek) */}
                  <button className="text-red-500">
                    🗑️
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">Henüz kaydedilmiş bir soru paketi yok.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageQuestion;
