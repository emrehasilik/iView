import React from 'react';
import useManageQuestionStore from '../store/Manage_Question_Store'; // Store'dan veriyi alacağız

const QuestionListPopup = ({ setIsPopupOpen, selectedPackages }) => {
  const questionPackages = useManageQuestionStore((state) => state.questionPackages);

  return (
    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-20">
      <div className="bg-white w-[500px] p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Question List</h2>

        <div className="space-y-4">
          {/* Seçilen paketlerin içindeki soruları göster */}
          {selectedPackages.map((pkgTitle, index) => {
            const selectedPackage = questionPackages.find((pkg) => pkg.title === pkgTitle);

            if (!selectedPackage) return null;

            return (
              <div key={index}>
                <h3 className="font-bold mb-2">{selectedPackage.title}</h3>
                {selectedPackage.questions.map((q, idx) => (
                  <div key={idx} className="flex justify-between bg-gray-100 p-2 rounded-lg">
                    <span>{q.question}</span>
                    <span>{q.minutes} min</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Popup kapatma butonu */}
        <div className="flex justify-end mt-6">
          <button
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
            onClick={() => setIsPopupOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionListPopup;
