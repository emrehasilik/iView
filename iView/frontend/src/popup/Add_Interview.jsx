import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useInterviewStore from '../store/Interview_Store'; 
import AddQuestionPopup from './Add_Question';
import { CloseCircleOutlined, SaveOutlined } from '@ant-design/icons';

const AddInterviewPopup = ({ setIsPopupOpen }) => {
  const addInterview = useInterviewStore((state) => state.addInterview);
  const [title, setTitle] = useState('');
  const [questionPackages, setQuestionPackages] = useState([]); // Soru paketleri için state
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [expireDate, setExpireDate] = useState('');
  const [showAtOnce, setShowAtOnce] = useState(false);
  const [isAddQuestionPopupOpen, setIsAddQuestionPopupOpen] = useState(false);

  // Backend'den soru paketlerini çek
  useEffect(() => {
    const fetchQuestionPackages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/question-packages');
        setQuestionPackages(response.data);
      } catch (error) {
        console.error('Soru paketleri alınırken hata oluştu:', error);
      }
    };
    fetchQuestionPackages();
  }, []);

  const handlePackageSelection = (pkgId) => {
    const selectedPackage = questionPackages.find((pkg) => pkg._id === pkgId);
    if (selectedPackage && !selectedPackages.includes(selectedPackage)) {
      setSelectedPackages([...selectedPackages, selectedPackage]);
    }
  };

  const handleSave = async () => {
    if (title && selectedPackages.length > 0 && expireDate) {
      const newInterview = {
        title,
        selectedPackages: selectedPackages.map((pkg) => pkg._id), // Sadece ID'ler gönderiliyor
        expireDate,
      };
      
      try {
        // Backend'e POST isteği gönder
        const response = await axios.post('http://localhost:5000/api/interviews', newInterview);
        // Yanıtta gelen selectedPackages ID'lerini tam paket verileriyle değiştir
        const newInterviewData = response.data;
        newInterviewData.selectedPackages = selectedPackages; // ID'leri tam verilerle değiştir
        addInterview(newInterviewData);
        setIsPopupOpen(false); // Popup'u kapat
      } catch (error) {
        console.error("Interview ekleme hatası:", error);
      }
    } else {
      console.log("Lütfen tüm alanları doldurunuz!");
    }
  };

  return (
    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-20">
      <div className="bg-white w-[500px] p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Create Interview</h2>
        
        {/* Title Input */}
        <input
          type="text"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        {/* Package Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Package</label>
          <div className="flex items-center">
            <select
              className="w-full p-3 border border-gray-300 rounded-lg"
              onChange={(e) => handlePackageSelection(e.target.value)}
              value=""
            >
              <option value="">Select Package</option>
              {questionPackages.map((pkg) => (
                <option key={pkg._id} value={pkg._id}>
                  {pkg.title}
                </option>
              ))}
            </select>
          </div>
          
          {/* Seçili paketler */}
          <div className="flex flex-wrap mt-4">
            {selectedPackages.map((pkg) => (
              <div key={pkg._id} className="flex items-center bg-gray-200 px-3 py-1 rounded-full mr-2 mb-2">
                <span className="text-gray-700">{pkg.title}</span>
                <button
                  className="ml-2 text-gray-500 hover:text-red-500"
                  onClick={() => setSelectedPackages(selectedPackages.filter((p) => p._id !== pkg._id))}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Expire Date Input */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Expire Date</label>
          <input
            type="date"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={expireDate}
            onChange={(e) => setExpireDate(e.target.value)}
          />
        </div>

        {/* Show At Once Toggle */}
        <div className="flex justify-between items-center mb-4">
          <label className="text-gray-700">Show At Once</label>
          <input
            type="checkbox"
            className="toggle"
            checked={showAtOnce}
            onChange={() => setShowAtOnce(!showAtOnce)}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            className="bg-red-500 text-black py-2 px-6 rounded-lg hover:bg-red-600 transition flex items-center"
            onClick={() => setIsPopupOpen(false)}
          >
            <CloseCircleOutlined className="mr-2" /> Cancel
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition flex items-center"
            onClick={handleSave}
          >
            <SaveOutlined className="mr-2" /> Add
          </button>
        </div>
      </div>

      {/* Add Question Popup */}
      {isAddQuestionPopupOpen && (
        <AddQuestionPopup
          setIsPopupOpen={setIsAddQuestionPopupOpen}
        />
      )}
    </div>
  );
};

export default AddInterviewPopup;
