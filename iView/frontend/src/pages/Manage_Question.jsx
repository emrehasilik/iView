import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import useManageQuestionStore from '../store/Manage_Question_Store';
import { EditOutlined, DeleteOutlined, CloseCircleOutlined } from '@ant-design/icons';

const ManageQuestion = () => {
  const questionPackages = useManageQuestionStore((state) => state.questionPackages);
  const fetchQuestionPackages = useManageQuestionStore((state) => state.fetchQuestionPackages);
  const removeQuestionPackage = useManageQuestionStore((state) => state.removeQuestionPackage);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestionPackages();
  }, [fetchQuestionPackages]);

  return (
    <div className="flex w-full h-full bg-gray-50">
      <Sidebar />

      <div className="flex-grow p-8">
        <Navbar />

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-700">Manage Question Package</h1>
          <div className="flex items-end"> {/* Add a wrapper to control vertical alignment */}
            <button
              className="bg-blue-500 text-white text-lg font-bold p-3 rounded-full shadow hover:bg-blue-600 transition-all duration-300 mt-4"
              onClick={() => navigate('/package-title')}
            >
              +
            </button>
          </div>
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
              <div key={pkg._id} className="grid grid-cols-4 gap-4 bg-white p-4 rounded-lg shadow mt-2 hover:shadow-lg transition-shadow duration-300">
                <div className="text-center text-gray-500 font-medium">{index + 1}</div>
                <div className="text-gray-700 font-medium">{pkg.title}</div>
                <div className="text-center text-gray-500">{pkg.questions.length}</div>
                <div className="flex justify-center space-x-4">
                  <button className="text-blue-500 hover:text-blue-700 transition-colors duration-300" onClick={() => navigate(`/edit-package/${pkg._id}`)}>
                    <EditOutlined style={{ fontSize: '25px', marginRight: '6px' }} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 transition-colors duration-300"
                    onClick={() => removeQuestionPackage(pkg._id)}
                  >
                    <DeleteOutlined style={{ fontSize: '22px', marginRight: '1px' }} />
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
