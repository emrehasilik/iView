// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CandidateInfoForm from './pages/CandidateInfoForm';
import InterviewQuestions from './pages/InterviewQuestions';

function App() {
  // Ortam değişkenini kontrol etmek için konsol log ekleyelim
  console.log(import.meta.env.VITE_PERSONEL_SERVER_URL);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/interview/:interviewId" element={<CandidateInfoForm />} />
        <Route path="/interview/:interviewId/questions" element={<InterviewQuestions />} />
      </Routes>
    </Router>
  );
}

export default App;
