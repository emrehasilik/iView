import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import usePersonelInformationStore from '../store/PersonelInformation';

function CandidateInfoForm() {
  const { interviewId } = useParams(); // URL'den interviewId'yi alın
  const navigate = useNavigate(); // useNavigate hook'unu ekleyin
  const [formValues, setFormValues] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    isApproved: false,
  });

  const setPersonalInfo = usePersonelInformationStore((state) => state.setPersonalInfo);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formValues.isApproved) {
      alert('KVKK metnini onaylamanız gerekiyor.');
      return;
    }

    try {
      // Backend'e form verilerini ve interviewId'yi gönder
      const response = await axios.post(
        `http://localhost:5000/api/interview/${interviewId}/personel-information`,
        formValues
      );

      const newPersonelId = response.data._id; // Gelen yanıttan adayın ID'sini al

      setPersonalInfo({ ...formValues, id: newPersonelId }); // Zustand store’a kaydet
      alert('Bilgiler başarıyla kaydedildi!');

      // InterviewQuestions sayfasına yönlendirme yap
      navigate(`/interview/${interviewId}/questions`);
    } catch (error) {
      console.error('Bilgiler kaydedilirken bir hata oluştu:', error);
      alert('Bilgiler kaydedilirken bir hata oluştu.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold text-center mb-4">Personal Information Form</h2>

        <label className="block mb-2">Name*</label>
        <input
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded p-2 w-full mb-4"
        />

        <label className="block mb-2">Surname*</label>
        <input
          type="text"
          name="surname"
          value={formValues.surname}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded p-2 w-full mb-4"
        />

        <label className="block mb-2">Email*</label>
        <input
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded p-2 w-full mb-4"
        />

        <label className="block mb-2">Phone*</label>
        <input
          type="tel"
          name="phone"
          value={formValues.phone}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded p-2 w-full mb-4"
        />

        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            name="isApproved"
            checked={formValues.isApproved}
            onChange={handleChange}
            required
            className="mr-2"
          />
          I have read and approved the KVKK text.
        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CandidateInfoForm;
