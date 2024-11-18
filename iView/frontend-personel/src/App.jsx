import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CandidateInfoForm from './pages/CandidateInfoForm';
import InterviewQuestions from './pages/InterviewQuestions';

function App() {
  return (
    <Router>
      <Routes>
        {/* Adayın form doldurduğu rota */}
        <Route path="/interview/:interviewId" element={<CandidateInfoForm />} />

        {/* Adayın soruları cevapladığı rota */}
        <Route path="/interview/:interviewId/questions" element={<InterviewQuestions />} />
      </Routes>
    </Router>
  );
}

export default App;
