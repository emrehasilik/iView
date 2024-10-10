import React from 'react';
import { useNavigate } from 'react-router-dom'; // Yönlendirme için gerekli import
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import useManageQuestionStore from '../store/Manage_Question_Store';

const ManageQuestion = () => {
  const questionPackages = useManageQuestionStore((state) => state.questionPackages);
  const removeQuestionPackage = useManageQuestionStore((state) => state.removeQuestionPackage); // Silme fonksiyonu
  const navigate = useNavigate(); // navigate fonksiyonu ile yönlendirme yapacağız

  return (
    <div className="flex w-full h-full bg-gray-50"> {/* Arka plan rengi ekledik */}
      <Sidebar />

      <div className="flex-grow p-8">
        <Navbar />

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-700">Manage Question Package</h1> {/* Yazı tipi büyüklüğü ve rengi daha belirgin */}
          {/* "+" Butonu ile Package Title sayfasına yönlendirme */}
          <button
            className="bg-blue-500 text-white text-lg font-bold p-3 rounded-full shadow hover:bg-blue-600 transition-all duration-300"
            onClick={() => navigate('/package-title')}
          >
            +
          </button>
        </div>

        <div className="w-full bg-white rounded-xl shadow p-6">
          <div className="grid grid-cols-4 gap-4 bg-gray-100 p-3 rounded-md font-semibold text-gray-600">
            <div className="text-center">#</div>
            <div>Package Name</div>
            <div className="text-center">Question Count</div>
            <div className="text-center">Action</div>
          </div>

          {questionPackages.length > 0 ? (
            questionPackages.map((pkg, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 bg-white p-4 rounded-lg shadow mt-2 hover:shadow-lg transition-shadow duration-300">
                <div className="text-center text-gray-500 font-medium">{index + 1}</div>
                <div className="text-gray-700 font-medium">{pkg.title}</div>
                <div className="text-center text-gray-500">{pkg.questions.length}</div>
                <div className="flex justify-center space-x-4">
                  {/* Kalem butonu ile edit-package sayfasına yönlendirme */}
                  <button className="text-blue-500 hover:text-blue-700 transition-colors duration-300" onClick={() => navigate(`/edit-package/${index}`)}>
                    ✏️
                  </button>
                  {/* Çöp kutusu butonuna basıldığında soru paketini sil */}
                  <button className="text-red-500 hover:text-red-700 transition-colors duration-300" onClick={() => removeQuestionPackage(index)}>
                    🗑️
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 mt-4">Henüz soru paketi oluşturulmadı.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageQuestion;
