import React, { useState } from 'react';
import useManageQuestionStore from '../store/Manage_Question_Store';
import useInterviewStore from '../store/Interview_Store'; // Zustand'dan mülakatları çekeceğiz
import AddQuestionPopup from './Add_Question'; // Mevcut soru ekleme popup'ını kullanacağız
import { CloseCircleOutlined, SaveOutlined } from '@ant-design/icons'; // İkonları içe aktarma

const AddInterviewPopup = ({ setIsPopupOpen }) => {
  const questionPackages = useManageQuestionStore((state) => state.questionPackages); // Paketleri Zustand'dan al
  const addInterview = useInterviewStore((state) => state.addInterview); // Yeni mülakat ekleme fonksiyonu
  const [title, setTitle] = useState('');
  const [selectedPackages, setSelectedPackages] = useState([]); // Birden fazla paket seçilecek
  const [expireDate, setExpireDate] = useState(''); // Tarih
  const [canSkip, setCanSkip] = useState(false); // Toggle için
  const [showAtOnce, setShowAtOnce] = useState(false); // Toggle için
  const [isAddQuestionPopupOpen, setIsAddQuestionPopupOpen] = useState(false); // Soru ekleme popup'ı durumu

  const handlePackageSelection = (pkg) => {
    if (!selectedPackages.includes(pkg)) {
      setSelectedPackages([...selectedPackages, pkg]); // Seçilen paketi ekle
    }
  };

  // Eklenen soruları yönetme
  const handleAddQuestion = (newQuestion) => {
    // Seçilen paketlere yeni soruyu ekleyeceğiz
    setSelectedPackages([...selectedPackages, newQuestion]);
  };

  const handleSave = () => {
    if (title && selectedPackages.length > 0 && expireDate) {
      const newInterview = {
        title,
        selectedPackages, // Çoklu seçilen paketler ve sorular
        expireDate,
        canSkip,
        showAtOnce,
      };
      
      addInterview(newInterview); // Mülakatı Zustand'a ekle
      setIsPopupOpen(false); // Pop-up'ı kapat
    } else {
      console.log("Lütfen tüm alanları doldurunuz!"); // Eğer alanlar boşsa uyarı
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
              {questionPackages.map((pkg, index) => (
                <option key={index} value={pkg.title}>
                  {pkg.title}
                </option>
              ))}
            </select>
          </div>
          
          {/* Seçili paketler */}
          <div className="flex flex-wrap mt-4">
            {selectedPackages.map((pkg, index) => (
              <div key={index} className="flex items-center bg-gray-200 px-3 py-1 rounded-full mr-2 mb-2">
                <span className="text-gray-700">{pkg}</span>
                <button
                  className="ml-2 text-gray-500 hover:text-red-500"
                  onClick={() => setSelectedPackages(selectedPackages.filter((p) => p !== pkg))}
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

        {/* Toggle Buttons */}
       

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
            <CloseCircleOutlined className="mr-2"  /> {/* Rengi kırmızı yapıldı */}
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition flex items-center"
            onClick={handleSave}
          >
            <SaveOutlined className="mr-2" /> {/* SaveOutlined ikonu eklendi */}
            Add
          </button>
        </div>
      </div>

      {/* Add Question Popup */}
      {isAddQuestionPopupOpen && (
        <AddQuestionPopup
          setIsPopupOpen={setIsAddQuestionPopupOpen} // Popup'u kapatmak için
        />
      )}
    </div>
  );
};

export default AddInterviewPopup;
