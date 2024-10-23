import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePersonelInformationStore from '../store/personelinformation'; // Zustand store'u import et

const PersonelInformation = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isApproved, setIsApproved] = useState(false);
  const navigate = useNavigate();
  
  // Zustand store'dan addPersonalInfo fonksiyonunu al
  const addPersonalInfo = usePersonelInformationStore((state) => state.addPersonalInfo);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form verilerini kaydet
    const personalInfo = { name, surname, email, phone, isApproved };
    addPersonalInfo(personalInfo); // Zustand store'a ekle

    // Konsola yazdır
    console.log('Kayıtlı Bilgiler:', personalInfo);

    // Form başarıyla doldurulduysa yönlendirme
    if (isApproved) {
      navigate('/interview-page'); // Adayı mülakat sayfasına yönlendir
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4 text-center">Personal Information Form</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name*"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-gray-300 rounded p-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Surname*"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
            className="border border-gray-300 rounded p-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded p-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            placeholder="Phone*"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="border border-gray-300 rounded p-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="flex items-center mb-4">
            <input 
              type="checkbox" 
              checked={isApproved} 
              onChange={() => setIsApproved(!isApproved)} 
              required
              className="mr-2"
            />
            I have read and approved the KVKK text.
          </label>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonelInformation;
