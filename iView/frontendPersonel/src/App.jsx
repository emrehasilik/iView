import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PersonelInformation from './popup/PersonelInformation';
import InterviewPage from './pages/InterviewPage'; // Mülakat sayfası bileşenini import et

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PersonelInformation isOpen={true} onClose={() => {}} />} /> {/* Ana sayfa */}
      <Route path="/interview-page" element={<InterviewPage />} /> {/* Mülakat sayfası */}
    </Routes>
  );
};

export default App;
