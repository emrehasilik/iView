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
    <div className="flex w-full h-full">
      <Sidebar />

      <div className="flex-grow p-8">
        <Navbar />

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Question Package</h1>
          {/* "+" Butonu ile Package Title sayfasına yönlendirme */}
          <button
            className="bg-gray-300 text-black text-lg font-bold p-2 rounded-full"
            onClick={() => navigate('/package-title')} // Yönlendirme buradan yapılacak
          >
            +
          </button>
        </div>

        <div className="w-full bg-gray-100 rounded-xl shadow p-6">
          <div className="grid grid-cols-4 gap-4 bg-gray-200 p-3 rounded-md font-bold">
            <div className="text-center">#</div>
            <div>Package Name</div>
            <div className="text-center">Question Count</div>
            <div className="text-center">Action</div>
          </div>

          {questionPackages.length > 0 ? (
            questionPackages.map((pkg, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 bg-white p-4 rounded-lg shadow mt-2">
                <div className="text-center">{index + 1}</div>
                <div>{pkg.title}</div>
                <div className="text-center">{pkg.questions.length}</div>
                <div className="flex justify-center space-x-4">
                  {/* Soru paketi silme butonu */}
                  <button className="text-red-500" onClick={() => removeQuestionPackage(index)}>
                    🗑️
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center mt-4">A question pack has not been created yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageQuestion;
